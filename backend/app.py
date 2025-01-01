from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS for cross-origin requests

#------  INITIALISING DATABASE TABLES -------------------------------------------

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

#------  MANAGING DATABASE QUERIES -------------------------------------------

#Route for GET request for task
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tasks')
    tasks = [{'id': row[0], 'description': row[1]} for row in cursor.fetchall()]
    return jsonify(tasks)

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
    print("A client connected.")
    emit('connection_response', {'message': 'Welcome to the chat!'})  # Send a welcome message to the client

# Event when a message is received from the client
@socketio.on('send_message')
def handle_send_message(data):
    print(f"Message received: {data}")
    emit('receive_message', data, broadcast=True)  # Broadcast the message to all connected clients

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
    socketio.run(app, debug=True)
