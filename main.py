from flask import Flask, request, jsonify, session
from flask_session import Session
from sql import load_messages, insert_message
from tempfile import mkdtemp
from api import generate

app = Flask(__name__)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/login/', methods=['POST'])
def login():
    email = request.get_json()['email']
    session['email'] = email
    messages = load_messages(email)
    print(email)
    # TODO: give messages to someone
    response = {
        # Add this option to distinct the POST request
        'email': email,
        "METHOD": "POST"
    }
    return jsonify(response)


@app.route('/message/', methods=['POST'])
def message():
    if session.get('email') is not None:
        email = session['email']
        message = request.get_json()['message']
        user_data = load_messages('varun@email.com')
        big_string = ''
        for i in range(len(user_data)):
            cur_tuple = user_data[i]
            big_string += cur_tuple[0]
            big_string += '\n--'
            if i != len(user_data) - 1:
                big_string += '\n'
        response = generate(big_string)
        new_message = f'Input: {message}\nResponse:{response}'
        insert_message(email, new_message)

        new_response = {
            # Add this option to distinct the POST request
            'response': response
        }
        return jsonify(new_response)
    else:
        return jsonify({
            "ERROR": "No email found. Please login."
        })



@app.route('/')
def index():
    # A welcome message to test our server
    return "<h1>Welcome to our medium-greeting-api!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)

