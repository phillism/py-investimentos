import sqlite3
from typing import List
from investimento import Investimento
from sqlalchemy import create_engine
from investimento_model import Base

# configuração do banco de dados SQLite
db_uri = 'sqlite:///investimentos.db'
engine = create_engine(db_uri)

# cria as tabelas no banco de dados (vindas do investimento_model.py)
Base.metadata.create_all(engine)




# Classe responsável por todas as modificações que irão ocorrer no banco de dados.
# (até o momento dedicada apenas para a tabela 'investimentos')
class Database():

	@staticmethod
	def get_db():
		con = sqlite3.connect("investimentos.db") 
		con.row_factory = sqlite3.Row 
		return con

	@staticmethod
	def obter_investimentos() -> List[Investimento]:
		con = Database.get_db()
		cur = con.cursor()
		cur.execute('SELECT * FROM investimentos;')

		response = cur.fetchall()
		con.close()

		return list(map(lambda r: Investimento._from(r).json(), response))

	@staticmethod
	def obter_investimento(codigo: int) -> Investimento:
		try:
			con = Database.get_db()
			cur = con.cursor()
			cur.execute(f'SELECT * FROM investimentos WHERE codigo = {codigo};')

			response = cur.fetchone()
			con.close()

			return Investimento._from(response)
		except sqlite3.Error as e:
			print(e)
			return Exception

	@staticmethod
	def add_investimento(investimento: Investimento):
		print(investimento)
		try:
			con = Database.get_db()

			ticker = investimento.ticker
			data = investimento.data
			quantidade = investimento.quantidade
			valor_unit = investimento.valor_unit
			tipo = investimento.tipo
			taxa_corretagem = investimento.taxa_corretagem

			cur = con.cursor()
			cur.execute(f"""INSERT INTO investimentos
				(ticker, data, quantidade, valor_unit, tipo, taxa_corretagem) 
				VALUES('{ticker.id if type(ticker) != str else ticker}', '{data}', {quantidade},
				{valor_unit}, '{tipo}', {taxa_corretagem});
			""")

			investimento.id = cur.lastrowid
			con.commit()
			con.close()
			return cur.rowcount > 0
		except sqlite3.Error as e:
			print(e)
			return Exception
	

	@staticmethod
	def delete_investimento(codigo: int):
		try:
			con = Database.get_db()

			cur = con.cursor()
			cur.execute(f"DELETE FROM investimentos WHERE codigo = {codigo};")

			con.commit()
			con.close()

			return cur.rowcount > 0
		except sqlite3.Error as e:
			print(e)
			return Exception

	@staticmethod
	def atualizar_investimento(investimento: Investimento):
		try:
			con = Database.get_db()

			cur = con.cursor()
			cur.execute(f"""UPDATE investimentos SET
				ticker = '{investimento.ticker.id if type(investimento.ticker) != str else investimento.ticker}', data = '{investimento.data}',
				quantidade = {investimento.quantidade}, valor_unit = {investimento.valor_unit},
				tipo = '{investimento.tipo}', taxa_corretagem = {investimento.taxa_corretagem}

				WHERE codigo = {investimento.id}
			""")

			con.commit()
			con.close()
			
			return cur.rowcount > 0
		except sqlite3.Error as e:
			print(e)
			return Exception