from app import get_db_connection
def create_users_table():

    #connecting to the database with the same function (to the API routes)
    conn = get_db_connection()
    cursor = conn.cursor()

    #Creating the 'Users' table storing their id, username, and password.
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY, 
            Username TEXT NOT NULL, 
            Password TEXT NOT NULL,
            Bio TEXT,
            Icon TEXT 
    )""")

    #Creating the FriendRequests table that will store the id, user id (the sender's id),
    # friend id (id of friend you're trying to request), and the status of the request
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS FriendRequests (
            id SERIAL PRIMARY KEY, 
            UserId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE,
            FriendId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE,
            Status TEXT NOT NULL
        )
    """)

    #Creating the Friends table to store the id, user id and friend id
    #  (in which the order doesn't matter because the friend connections 
    # will be added two rows at a time with both ways).
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Friends (
            id SERIAL PRIMARY KEY, 
            UserId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE,
            FriendId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE
        )
    """)
    cursor.execute('CREATE EXTENSION IF NOT EXISTS pg_trgm')
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_users_table()