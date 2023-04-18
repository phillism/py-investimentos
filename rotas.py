from flask import render_template, Blueprint

bp = Blueprint('rotas', __name__)

@bp.route("/")
def index():
	return render_template('index.html')

@bp.route("/investimentos/{id}")
def obter_investimento():
	pass

@bp.route("/investimentos")
def obter_investimentos():
	pass

@bp.route("/investimentos")
def adicionar_investimento():
	pass

@bp.route("/investimentos/{id}")
def remover_investimento():
	pass

@bp.route("/investimentos/{id}")
def atualizar_investimento():
	pass
