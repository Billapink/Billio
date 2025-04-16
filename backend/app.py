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
    # Use the DATABASE_URL directly
    db_url = os.getenv("DATABASE_URL", "postgres://u7fknjpb0a89q7:pcf1ddf627519015bea51df1410d2e8e55dda78118a04a90c5feedb0f0ebd96f7@ce0lkuo944ch99.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5nrok0ifieaq7")
    
    try:
        # Connect using the full DATABASE_URL
        conn = psycopg2.connect(db_url, sslmode="require")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise

#------  MANAGING DATABASE QUERIES -------------------------------------------
@app.route("/")
def home():
    return "Hello, Flask app is running!"

#Route for POST request for task
@app.route('/api/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    if not data or 'description' not in data:
            return jsonify({"error": "Invalid or missing data"}), 400

    description = data.get('description')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert task into table
        cursor.execute('INSERT INTO tasks (description) VALUES (%s)', (description,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Task added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#Route for GET request for task
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM tasks')
        # Fetch all rows and convert to a list of dictionaries
        tasks = [{'id': row[0], 'description': row[1]} for row in cursor.fetchall()]
        # Close the connection
        cursor.close()
        conn.close()
        # Return tasks as JSON
        return jsonify(tasks)
    except Exception as e:
        # Handle exceptions
        return jsonify({"error": str(e)}), 500

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
                return jsonify({'status':'success', 'message':'You have successfully logged in!'})
        
        return jsonify({'status':'error', 'message':'Incorrect username or password, please try again.'})
    
    except Exception as e:
        return jsonify({'status':'error', 'message': str(e)}), 500



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