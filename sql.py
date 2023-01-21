import sqlite3

conn = sqlite3.connect("mydatabase.db")
mycursor = conn.cursor()

def create_messages_table():
    """Initialize message table"""

    command = f"CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, user nvarchar(100), message nvarchar(100))"
    mycursor.execute(command)
    conn.commit()

def insert_message(user: str, message:str):
    """Insert new message into messages"""
    command = f"INSERT INTO messages (user, message) VALUES ('{user}', '{message}')"
    mycursor.execute(command)
    conn.commit()


def load_messages(user: int) -> list[tuple]:
    """Returns a list of current medications for specified user"""
    command = f"""SELECT * FROM messages WHERE user = '{user}'"""
    mycursor.execute(command)

    return mycursor.fetchall()


def remove_user(user: id):
    """Remove all messages from user"""
    command = f"DELETE FROM messages WHERE user = '{user}'"
    mycursor.execute(command)
    conn.commit()


def remove_message(user: id, message: str):
    """Remove message from user"""
    command = f"DELETE FROM messages WHERE user = '{user}' AND message = '{message}'"
    mycursor.execute(command)
    conn.commit()


def remove_specific(message_id: id):
    """Remove particular message from user"""
    command = f"DELETE FROM messages WHERE id = {message_id}"
    mycursor.execute(command)
    conn.commit()

# print(load_messages(2))
# mycursor.execute('SELECT * FROM messages')
# print(mycursor.fetchall())
