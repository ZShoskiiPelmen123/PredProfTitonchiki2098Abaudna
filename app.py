from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import delete
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from models import db, User, UserType, Object, ObjectType


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lab.db'
db.init_app(app)

authType = {'userTypeId': 0, 'userId': 0}

with app.app_context():
    db.create_all()


def check_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if authType['userTypeId'] == 0:
            return redirect('/')
        return f(*args, **kwargs)
    return decorated_function


def isAdmin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if authType['userTypeId'] != 3:
            return redirect('/')
        return f(*args, **kwargs)
    return decorated_function


@app.route("/")
def main():
    return render_template("main.html")


@app.route("/register", methods=['POST'])
def register():
    if request.method == "POST":
        global authType
        if request.method == 'POST':
            if User.query.filter_by(nickname=request.form['nickname']).first() is None:
                hashed_password = generate_password_hash(request.form['password'])
                new_user = User(nickname=request.form['nickname'], name=request.form['name'],
                                lastname=request.form['lastname'], password=hashed_password,
                                usertype_id=int(request.args.get('userTypeId')),
                                key=request.form['key'] if 'key' in request.form else None)
                db.session.add(new_user)
                db.session.commit()
                authType['userTypeId'] = new_user.usertype_id
                authType['userId'] = new_user.id
                if new_user.usertype_id == 3:
                    return render_template('admin.html', authType=authType)
                else:
                    return render_template('user.html', authType=authType)
            else:
                return "user already exists"
        if request.method == 'GET':
            return "кто ты?"


@app.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        global authType
        user = User.query.filter_by(nickname=request.form['nickname'],
                                    usertype_id=int(request.args.get('userTypeId'))).first()
        if user is not None:
            hash = generate_password_hash(request.form['password'])
            if check_password_hash(user.password, request.form['password']):
                authType['userTypeId'] = user.usertype_id
                authType['userId'] = user.id
                if authType['userTypeId'] == 3:
                    if user.key == request.form['key']:
                        return render_template('admin.html', authType=authType)
                    else:
                        return 'Ключ указан неверно'
                else:
                    return render_template('user.html', authType=authType)
            else:
                return 'Имя пользователя или пароль указаны неверно'
        else:
            return 'Имя пользователя или пароль указаны неверно'


@app.route("/admin", methods=['GET'])
@isAdmin
def admin():
    return render_template("admin.html")


@app.route("/user", methods=['GET'])
@check_auth
def user():
    return render_template("user.html")


@app.route("/inventory", methods=['GET', 'POST', 'PUT', 'DELETE'])
@check_auth
def inventory():
    if request.method == "POST":
        new_object = Object(name=request.json['name'], amount=request.json['amount'],
                            status=request.json['status'], userid=None, object_type=None)
        db.session.add(new_object)
        db.session.commit()
        return jsonify(success=True)
    elif request.method == "DELETE":
        obj = Object.query.filter_by(id=request.json['objectId']).delete()
        db.session.commit()
        return jsonify(success=True)
    elif request.method == "GET":
        objects = Object.query.all()
        return render_template("inventory.html", objects=objects)



@app.route("/inventory_user", methods=["GET"])
def inventory_user():
    if request.method == "GET":
        objects = Object.query.all()
        return render_template("inventory_user.html", objects=objects)


@app.route("/logout")
def logout():
    if request.method == "GET":
        authType['userTypeId'] = 0
        authType['userId'] = 0
        return render_template('main.html')


@app.route("/otchot")
def otchot():
    return render_template("otchot.html")


@app.route("/order")
def order():
    return render_template("order.html")


@app.route("/zakrep")
def zakrep():
    return render_template("zakrep.html")


@app.route("/zakupki")
def zakupki():
    return render_template("zakupki.html")


@app.route("/order_user")
def order_user():
    return render_template("order_user.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)
