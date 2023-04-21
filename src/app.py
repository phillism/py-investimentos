from flask import Flask
from rotas import bp as rotas_bp

app = Flask(__name__, template_folder='../public')
app.config['JSON_SORT_KEYS'] = False
app.register_blueprint(rotas_bp)

if __name__ == "__main__":
    app.run(debug=True)
