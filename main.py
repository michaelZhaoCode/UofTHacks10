from flask import Flask, render_template, request, redirect, session
from flask_session import Session
from tempfile import mkdtemp
from functools import wraps


app = Flask(__name__)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/1.1.x/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("username") is None:
            return redirect("/login/good")
        return f(*args, **kwargs)
    return decorated_function


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        session.clear()
        user_id = request.form.get("email")
        session["user_id"] = user_id
        return redirect("/")
    else:
        return render_template("login.html")


@app.route("/")
@login_required
def index():
    pass
