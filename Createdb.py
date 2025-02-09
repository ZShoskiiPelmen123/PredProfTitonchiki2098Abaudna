from flask import Flask
from models import db, UserType, Object, ObjectType

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lab.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        usertype1 = UserType(name="Ученик")
        usertype2 = UserType(name="Физрук")
        usertype3 = UserType(name="Админ")
        db.session.add_all([usertype1, usertype2, usertype3])
        object1 = Object(name="Мяч баскетбольный", amount=52, userid=None, object_type=1, status='новый')
        object2 = Object(name="Скакалка", amount=19, userid=None, object_type=1, status='новый')
        object3 = Object(name="Мяч волейбольный", amount=14, userid=None, object_type=1, status='используемый')
        db.session.add_all([object1, object2, object3])
        object_type1 = ObjectType(name="Доступно")
        object_type2 = ObjectType(name="Забронировано")
        object_type3 = ObjectType(name="Выдано")
        object_type4 = ObjectType(name="Сломано :(")
        db.session.add_all([object_type1, object_type2, object_type3, object_type4])
        db.session.commit()
