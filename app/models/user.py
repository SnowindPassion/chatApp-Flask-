from flask import url_for
from app import db
import bcrypt
import uuid

class User(db.Document):
    username = db.StringField(max_length=255, required=True)
    password_digest = db.StringField(max_length=255, required=True)
    session_token = db.StringField(max_length=255, required=True)
    friends = db.ListField(db.EmbeddedDocumentField('User'))

    @classmethod
    def generate_session_token(cls):
        return str(uuid.uuid1())

    @classmethod
    def validate_user_credentials(cls, user):
        return user.password_digest == bcrypt.hashpw(password, x.password_digest)

    @classmethod
    def find_by_username(cls, username):
        return db.user.find_one({ "username": username })

    @classmethod
    def find_by_session_token(cls, session_token):
        return db.user.find_one({ "session_token": session_token })

    @classmethod
    def destroy(cls, user):
        if db.user.remove({ username: user.username }, 1):
            return True
        else:
            return False

    def generate_password_digest(self, password):
        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(password, salt)
        self.password_digest = hash

    def reset_session_token(self):
        self.session_token = User.generate_session_token()

    def get_absolute_url(self):
        return url_for('user', kwargs={"username": self.username})

    meta = {
        'allow_inheritance': True,
        'indexes': ['username', 'session_token'],
        'ordering': ['+username']
    }
