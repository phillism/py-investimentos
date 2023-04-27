from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(
    __name__, 
    template_folder='../public', 
    static_folder='../static'
)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///investimentos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

CORS(app)

db = SQLAlchemy()

from rotas import bp as rotas_bp
app.register_blueprint(rotas_bp)

if __name__ == '__main__':
    app.run(debug=True)
    db.create_all()
