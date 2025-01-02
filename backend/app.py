from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from flask_socketio import SocketIO, emit


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=False, engineio_logger=False)  # Enable CORS for cross-origin requests

#------  INITIALISING DATABASE TABLES -------------------------------------------

def get_db_connection():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_user",
        password="your_password",
        host="your_host",  # e.g., 'localhost' or the Heroku database host
        port="your_port"   # e.g., '5432' for default PostgreSQL
    )
    return conn

#------  MANAGING DATABASE QUERIES -------------------------------------------

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

#Route for POST request for task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json  
    description = data.get('description')

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (description) VALUES (?)', (description,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Task added successfully!'}), 201

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
