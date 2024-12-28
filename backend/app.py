from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, description TEXT)')
    conn.commit()
    conn.close()

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tasks')
    tasks = [{'id': row[0], 'description': row[1]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (description) VALUES (?)', (data['description'],))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Task added successfully!'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
