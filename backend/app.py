from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from flask_socketio import SocketIO, emit
import os


app = Flask(__name__)
CORS(app, origins=["https://your-frontend.vercel.app"])
socketio = SocketIO(app, cors_allowed_origins="*", logger=False, engineio_logger=False)  # Enable CORS for cross-origin requests

#------  CONNECTING TO THE DATABASE -------------------------------------------

def get_db_connection():
    # Use the DATABASE_URL directly
    db_url = os.getenv("DATABASE_URL", "postgres://u9p9f08j6sqs9q:p93b2296938500e4f348f64325de454ff7f88376bdd685e0c2fc4412c0e3e35ea@cfls9h51f4i86c.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d29ful820lnia0")
    
    try:
        # Connect using the full DATABASE_URL
        conn = psycopg2.connect(db_url, sslmode="require")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise

#------  MANAGING DATABASE QUERIES -------------------------------------------

#Route for POST request for task
@app.route('/api/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    description = data.get('description')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Create table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                description TEXT NOT NULL
            )
        ''')

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
        # Query the database
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
    socketio.run(app, debug=True)
