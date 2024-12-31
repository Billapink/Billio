from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
