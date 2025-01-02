import sqlite3

def insert_task(description):
    # Connect to the database
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Insert only the description; SQLite will auto-generate the ID
    cursor.execute('INSERT INTO tasks (description) VALUES (?)', (description,))

    # Commit the changes
    conn.commit()
    conn.close()

# Example usage
if __name__ == '__main__':
    insert_task('Buy groceries')
    insert_task('Do laundry')
    insert_task('Fold Clothes')
    print("Tasks added successfully!")
