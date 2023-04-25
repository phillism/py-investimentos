import sqlite3
from flask import jsonify, render_template, Blueprint, request, make_response
from sqlite3 import Error

from database import Database
from investimento import Investimento

bp = Blueprint('rotas', __name__)

@bp.route("/", methods=['GET'])
def index():
	return render_template('index.html')



# Rota para obter um único investimento.
@bp.route("/investimentos/<id>", methods=['GET'])
def obter_investimento(id):
	investimento = Database.obter_investimento(id)

	if investimento == Exception:
		return jsonify({ 'erro': 'Não foi possível realizar esta operação.' }), 500

	if investimento:
		return jsonify(investimento.json()), 200
	else:
		return jsonify({ 'erro': 'Investimento não encontrado no banco de dados.' }), 404



# Rota para obter a lista de todos os investimentos.
@bp.route("/investimentos", methods=['GET'])
def obter_investimentos():
	all = Database.obter_investimentos()
	if all == Exception:
		return jsonify({ 'erro': 'Não foi possível realizar esta operação.' }), 500
	
	return jsonify(all)



# Rota para adicionar um novo investimento.
@bp.route("/investimentos", methods=['POST'])
def adicionar_investimento():
	body = request.json
	investimento = Investimento(None, None, None, None, None, None)

	for key in dict(body).keys():
		key = key.lower()
		if key != 'id' and key in investimento.__dict__.keys():
			setattr(investimento, key, body[key])
	
	criou = Database.add_investimento(investimento)

	if criou == Exception:
		return jsonify({ 'erro': 'Não foi possível realizar esta operação.' }), 500

	return jsonify(investimento.json()), 200



# Rota para deletar um investimento.
@bp.route("/investimentos/<id>", methods=['DELETE'])
def remover_investimento(id: str):
	deletado = Database.delete_investimento(id)

	if deletado == Exception:
		return jsonify({ 'erro': 'Não foi possível realizar esta operação.' }), 500

	if deletado:
		return jsonify({ 'mensagem': 'Investimento deletado com sucesso!' }), 200
	
	return jsonify({ 'mensagem': 'Investimento não encontrado.' }), 404



# Rota para atualizar um investimento.
@bp.route("/investimentos/<id>", methods=['PUT'])
def atualizar_investimento(id):
	body = request.json
	investimento = Database.obter_investimento(id)

	if investimento:
		for key in dict(body).keys():
			if key == 'id': continue
			setattr(investimento, key, body[key])

		atualizado = Database.atualizar_investimento(investimento)
		if atualizado == Exception:
			return jsonify({ 'erro': 'Não foi possível realizar esta operação.' }), 500

		if not atualizado:
			return jsonify({}), 204

		return jsonify(investimento.json()), 200
	else:
		return jsonify({ 'mensagem': 'Investimento não encontrado.' }), 404
