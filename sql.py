import sqlite3
# conn = sqlite3.connect("mydatabase.db")
# mycursor = conn.cursor()

def create_messages_table():
    """Initialize message table"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, user nvarchar(100), message nvarchar(100))"
    mycursor.execute(command)
    conn.commit()

def insert_message(user: str, message:str):
    """Insert new message into messages"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"INSERT INTO messages (user, message) VALUES ('{user}', '{message}')"
    mycursor.execute(command)
    conn.commit()

# insert_message('varun@email.com', 'Input: I want someone to talk to\nResponse: I am always here to listen to your worries!')
# insert_message('varun@email.com', 'Input: I am having friendship troubles\nResponse: Could you please describe your problem a bit more?')
# insert_message('varun@email.com', 'Input: I am feeling useless\nResponse: As I have gotten to know you, I can guarantee you that you are important and unique')
# insert_message('varun@email.com', 'Input: My best friend stopped talking to me a few days ago and I am panicking\nResponse: First take a deep breath, and then maybe once you are feeling better, try your best to talk over your problems with your friend!')
# insert_message('varun@email.com', 'Input: I am feeling good today for a change!\nResponse: That iss awesome, I am glad to know your feeling better about yourself!')
def load_messages(user: int) -> list[tuple]:
    """Returns a list of current medications for specified user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"""SELECT message FROM messages WHERE user = '{user}'"""
    mycursor.execute(command)

    return mycursor.fetchall()
    

def remove_user(user: id):
    """Remove all messages from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM messages WHERE user = '{user}'"
    mycursor.execute(command)
    conn.commit()


def remove_message(user: id, message: str):
    """Remove message from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM messages WHERE user = '{user}' AND message = '{message}'"
    mycursor.execute(command)
    conn.commit()


def remove_specific(message_id: id):
    """Remove particular message from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM messages WHERE id = {message_id}"
    mycursor.execute(command)
    conn.commit()

# print(load_messages(2))
# mycursor.execute('SELECT * FROM messages')
# print(mycursor.fetchall())
