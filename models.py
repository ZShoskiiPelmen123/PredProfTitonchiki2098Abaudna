from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    key = db.Column(db.String(80))
    usertype_id = db.Column(db.Integer, db.ForeignKey('user_type.id'))

    def __init__(self, nickname, name, lastname, password, key, usertype_id):
        self.nickname = nickname
        self.name = name
        self.lastname = lastname
        self.password = password
        self.key = key
        self.usertype_id = usertype_id


class UserType(db.Model):
    __tablename__ = 'user_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name


class Object(db.Model):
    tablename = 'object'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    amount = db.Column(db.Text, nullable=False)
    status = db.Column(db.Text, nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey('user.id'))
    objecttype_id = db.Column(db.Integer, db.ForeignKey('object_type.id'))

    def __init__(self, name, amount, status, userid, object_type):
        self.name = name
        self.amount = amount
        self.status = status
        self.userid = userid
        self.objecttype_id = object_type


class ObjectType(db.Model):
    __tablename__ = 'object_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name


class Tovar(db.Model):
    tablename = 'Tovar'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Text, nullable=False)

    def __init__(self, name, price):
        self.name = name
        self.price = price


class Repair(db.Model):
    tablename = 'Repair'
    id = db.Column(db.Integer, primary_key=True)
    repair = db.Column(db.String(80), db.ForeignKey("tovar.id"))
    date = db.Column(db.Date, nullable=False)

    def __init__(self, repair, date):
        self.repair = repair
        self.date = date
