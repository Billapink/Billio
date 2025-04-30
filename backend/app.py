from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from flask_socketio import SocketIO, emit
import os


app = Flask(__name__)
CORS(app, origins=["https://www.billio.co.uk", "http://localhost:3000"])
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "default-secret-key")
socketio = SocketIO(app, cors_allowed_origins="*")

#------  CONNECTING TO THE DATABASE -------------------------------------------

def get_db_connection():
    # Using DATABASE_URL from hosting server
    db_url = os.getenv("DATABASE_URL", "postgres://u7fknjpb0a89q7:pcf1ddf627519015bea51df1410d2e8e55dda78118a04a90c5feedb0f0ebd96f7@ce0lkuo944ch99.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5nrok0ifieaq7")
    
    try:
        # Making the connection via whole url
        conn = psycopg2.connect(db_url, sslmode="require")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise

#------  MANAGING DATABASE QUERIES -------------------------------------------

#Sign up database querying and logic
@app.route('/api/sign_up', methods=['GET', 'POST'])
def sign_up():
    try:
        data = request.get_json()
        new_username = data.get('newUsername')
        new_password = data.get('newPassword')

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM Users WHERE Username = %s', (new_username,))
        existing_user = cursor.fetchone()
        
        num_included = False
        for letter in new_password:
            if letter in '0123456789':
                num_included = True

        if existing_user:
            return jsonify({'status':'error', 'message':'Error! This username already in use, please choose another one. '})
        elif len(new_password) < 7:
            return jsonify({'status':'error', 'message':'Error! Password must be at least 7 characters.'})
        elif num_included == False:
            return jsonify({'status':'error', 'message':'Error! You must have at least 1 digit in your password.'})
        
            

        cursor.execute('INSERT INTO Users (Username, Password) VALUES (%s,%s)', (new_username, new_password))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'status':'successful', 'message':'You have successfully created an account!'})
    
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500
    
#Log in database querying and logic
@app.route('/api/log_in', methods=['GET', 'POST'])
def log_in():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM Users WHERE Username = %s', (username,))
        existing_user = cursor.fetchone()

        cursor.close()
        conn.close()

        if existing_user:
            if password == existing_user[2]:
                if existing_user[3] and existing_user[4]:
                    return jsonify({
                        'status':'success', 
                        'message':'You have successfully logged in!',
                        'user_id': existing_user[0],
                        'username': existing_user[1],
                        'icon': existing_user[3],
                        'bio': existing_user[4],
                        'profile_complete':'true'
                    })
                else:
                    return jsonify({
                        'status':'success', 
                        'message':'You have successfully logged in!',
                        'user_id': existing_user[0],
                        'username': existing_user[1], 
                        'profile_complete':'false'
                    })
        
        return jsonify({'status':'error', 'message':'Incorrect username or password, please try again.'})
    
    except Exception as e:
        return jsonify({'status':'error', 'message': str(e)}), 500


@app.route('/api/friend_request', methods=['POST'])
def friend_request():
    try:
        data = request.get_json()
        userId = data.get('userId')
        friendId = data.get('friendId')
        conn = get_db_connection()

        #checking if the user and the friend exist in the database
        findUser(conn, userId)
        findUser(conn, friendId)

        cursor = conn.cursor()
        
        #checking if the friend request already exists in the database
        cursor.execute('SELECT * FROM FriendRequests WHERE userId=%s AND friendId=%s', (userId, friendId, ))
        existing_request = cursor.fetchone()
        if existing_request:
            return jsonify ({"status":"error", "message": "There is an existing friend request"}), 500

        #otherwise adding a row into the friendrequests table with the status 'pending'
        cursor.execute('INSERT INTO FriendRequests (userId, friendId, status) VALUES (%s, %s, %s)', (userId, friendId, 'pending'))
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500

@app.route('/api/get_friend_requests', methods=['POST'])
def get_friend_requests():
    try:
        data = request.get_json()
        userId = data.get('userId')

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
                       SELECT username, icon FROM FriendRequests 
                       JOIN Users
                       ON FriendRequests.userid=Users.id
                       WHERE friendid = %s and status='pending'
                       ''', (userId,))
        
        friendRequests = [{'name': friendRequest[0], 'icon': friendRequest[1]} for friendRequest in cursor.fetchall()]

        cursor.close()
        conn.close()

        return jsonify ({"status":"success", "data": friendRequests})

        
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500

@app.route('/api/respond_request', methods=['POST'])
def respond_request():
    try:
        data = request.get_json()
        userId = data.get('userId')
        friendId = data.get('friendId')
        response = data.get('response')
        
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM FriendRequests WHERE userId=%s AND friendId=%s', (userId, friendId, ))
        existing_request = cursor.fetchone()
        if not existing_request:
            return jsonify ({"status":"error", "message": "No existing friend request"}), 500

        if response == 'accept':
            cursor.execute('UPDATE FriendRequests SET status=%s WHERE userId=%s AND friendId=%s', ('accepted', userId, friendId, ))
            cursor.execute('INSERT INTO Friends (userId, friendId) VALUES (%s, %s)', (userId, friendId, ))
            cursor.execute('INSERT INTO Friends (userId, friendId) VALUES (%s, %s)', (friendId, userId, ))
        elif response == 'reject':
            cursor.execute('UPDATE FriendRequests SET status=%s WHERE userId=%s AND friendId=%s', ('rejected', userId, friendId, ))
        else:
            return jsonify ({"status":"error", "message": "Response must be 'accept' or 'reject'"}), 500
        
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500

@app.route('/api/get_friends', methods=['POST'])
def get_friends():
    try:
        data = request.get_json()
        userId = data.get('user_id')

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            SELECT u.username, f.friendId, u.icon FROM Friends as f 
            JOIN Users as u ON f.friendId = u.id
            WHERE f.userId=%s
        ''', (userId, ))
        friends = [{'name': friend[0], 'id': friend[1], 'icon': friend[2]} for friend in cursor.fetchall()]

        cursor.close()
        conn.close()

        return jsonify({'status':'success', 'data': friends})
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500

@app.route('/api/search_users', methods=['GET'])
def search_users():
    try:
        data = request.get_json()
        query = data.get('query')
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            SELECT id, username, similarity(username, %s) as score
            FROM Users
            WHERE score > 0.5
        ''', (query, ))
        results = [{'id': f[0], 'name': f[1], 'score': f[2]} for f in cursor.fetchall()]

        sortedResults = sortSearchResultsByScore(results)

        cursor.close()
        conn.close()

        return jsonify({'status':'success', 'data': sortedResults})
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500

@app.route('/api/update_profile', methods=['POST'])
def update_profile():
    try:
        data = request.get_json()
        bio = data.get('bio')
        icon = data.get('icon')
        user_id = data.get('user_id')
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
            UPDATE Users SET (bio, icon)=(%s, %s) WHERE id=%s
        ''', (bio, icon, user_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status':'success', 'data': f'Data saved successfully for user {user_id}!'})
    
    except Exception as e:
        return jsonify ({"status":"error", "message": str(e)}), 500

#------  UTILITY FUNCTIONS -------------------------------------------

def sortSearchResultsByScore(results):
    return recursiveSortSearchResultsByScore(results, 0 , len(results))

def recursiveSortSearchResultsByScore(results, start, end):
    if end - start <= 1:
        return [results[start]]

    mid = (start + end) // 2
    left = recursiveSortSearchResultsByScore(results, start, mid)
    right = recursiveSortSearchResultsByScore(results, mid, end)

    merged = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        if left[i].score > right[j].score:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    while i < len(left):
        merged.append(left[i])
        i += 1
    
    while j < len(right):
        merged.append(right[j])
        j += 1
    
    return merged

def findUser(conn, userId):
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Users WHERE id = %s', (userId,))
    existing_user = cursor.fetchone()
    
    if not existing_user:
        raise Exception('User not found')
    
    return existing_user


#------  MANAGING MESSAGE BROADCASTING -------------------------------------------

# Event when a client connects

@socketio.on('connect')
def handle_connect():
    print(f"User: {request.sid} connected.")
    emit('connection_response', {'message': f'Welcome to the chat {request.sid}!'})  # Send a welcome message to the client

# Event when a message is received from the client
@socketio.on('send_message')
def handle_send_message(data):
    print(f"Message received: {data}")
    emit('receive_message', data, broadcast=True)  # Broadcast the message to all connected clients

@socketio.on('disconnect')
def handle_disconnect():
    print(f"User disconnected: {request.sid}")

if __name__ == '__main__':
    get_db_connection()
    app.run(debug=True)
    socketio.run(app)