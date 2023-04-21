from flask import jsonify, render_template, Blueprint, request, make_response

bp = Blueprint('rotas', __name__)

@bp.route("/", methods=['GET'])
def index():
	return render_template('index.html')

@bp.route("/investimentos/<id>", methods=['GET'])
def obter_investimento():
	return ''

@bp.route("/investimentos", methods=['GET'])
def obter_investimentos():
	return 'das'

@bp.route("/investimentos", methods=['POST'])
def adicionar_investimento():
	return 'post'

@bp.route("/investimentos/<id>", methods=['DELETE'])
def remover_investimento(id: str):
	return make_response(jsonify(request.json))

@bp.route("/investimentos/<id>", methods=['PUT'])
def atualizar_investimento():
	return 'put'
