import sqlite3
from flask import jsonify, render_template, Blueprint, request, make_response
from sqlite3 import Error

from database import Database
from investimento import Investimento
from ticker import Ticker

bp = Blueprint('rotas', __name__)

def make_error(code, mensagem = 'Não foi possível realizar esta operação.'):
	return jsonify({ 'erro': f'[{code}] {mensagem}' }), code



# Rota para carregar a página inicial.
@bp.route("/", methods=['GET'])
def index():
	return render_template('index.html')



@bp.route("/ticker/<ticker>", methods=['GET'])
def exibir_detalhamento(ticker):
    investimentos = Database.obter_investimentos()
    for i in investimentos:
        try:
            if i['ticker']['cod'].lower() == ticker.lower():
                return render_template('ticker.html', ticker=i['ticker']['cod'])
        except:
            continue

    return render_template('notfound.html'), ticker


# Rota para obter um único investimento.
@bp.route("/investimentos/<id>", methods=['GET'])
def obter_investimento(id):
	investimento = Database.obter_investimento(id)

	if investimento == Exception:
		return make_error(500)

	if investimento:
		return jsonify(investimento.json()), 200
	else:
		return make_error(404, 'Investimento não encontrado no banco de dados.')



# Rota para obter a lista de todos os investimentos.
@bp.route("/investimentos", methods=['GET'])
def obter_investimentos():
	all = Database.obter_investimentos()
	if all == Exception:
		return make_error(500)
	
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
	
	if not investimento.ticker or not Ticker.exists(investimento.ticker):
		return jsonify({ 'erro': 'O ticker passado não existe.' }), 404
	
	criou = Database.add_investimento(investimento)

	if criou == Exception:
		return make_error(500)
	

	return jsonify(investimento.json()), 200



# Rota para deletar um investimento.
@bp.route("/investimentos/<id>", methods=['DELETE'])
def remover_investimento(id: str):
	deletado = Database.delete_investimento(id)

	if deletado == Exception:
		return make_error(500)

	if deletado:
		return jsonify({ 'mensagem': 'Investimento deletado com sucesso!' }), 200
	
	return make_error(404, 'Investimento não encontrado no banco de dados.')



# Rota para atualizar um investimento.
@bp.route("/investimentos/<id>", methods=['PUT'])
def atualizar_investimento(id):
	body = request.json
	investimento = Database.obter_investimento(id)

	if investimento:
		for key in dict(body).keys():
			if key == 'id': continue
			setattr(investimento, key, body[key])

		if 'ticker' in dict(body).keys():
			if not Ticker.exists(investimento.ticker):
				return jsonify({ 'erro': 'O ticker passado não existe.' }), 404

		atualizado = Database.atualizar_investimento(investimento)
		if atualizado == Exception:
			return make_error(500)

		return jsonify(investimento.json()), 200
	else:
		return make_error(404, 'Investimento não encontrado no banco de dados.')
