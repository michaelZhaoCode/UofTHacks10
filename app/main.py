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
    print(email)
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
        input_message = request.get_json()['message']
        naive = request.get_json()['naive']
        big_string = ''
        if naive != "Yes":
            user_data = load_messages(email)

            for i in range(len(user_data)):
                cur_tuple = user_data[i]
                big_string += cur_tuple[0]
                big_string += '\n--\n'
        big_string += f'Input:{input_message}\nResponse:'
        response = generate(big_string)
        new_message = f'Input: {input_message}\nResponse:{response}'
        try:
            insert_message(email, new_message)
        except:
            print(email, new_message)

        new_response = {
            # Add this option to distinct the POST request
            'response': response
        }
        return jsonify(new_response)
    else:
        return jsonify({
            "ERROR": "No email found. Please login."
        })


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
