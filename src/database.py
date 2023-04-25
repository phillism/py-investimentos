import sqlite3
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from datetime import date
from sqlalchemy import CheckConstraint
from investimento import Investimento

from datetime import date
from sqlalchemy import CheckConstraint, Column, Date, Float, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base



Base = declarative_base()

class Investimentos(Base):
    __tablename__ = 'investimentos'
    codigo = Column(Integer, primary_key=True)
    ticker = Column(String(8), nullable=False)
    data = Column(Date, default=date.today(), nullable=False)
    quantidade = Column(Integer, CheckConstraint("quantidade >= 0"), nullable=False)
    valor_unit = Column(Float(precision=2), nullable=False)
    tipo = Column(String(1), CheckConstraint("tipo IN ('V', 'C')"), nullable=False)
    taxa_corretagem = Column(Float(precision=16), nullable=False)


# configuração do banco de dados SQLite
db_uri = 'sqlite:///investimentos.db'
engine = create_engine(db_uri)

# cria as tabelas no banco de dados
Base.metadata.create_all(engine)

class Database():

	@staticmethod
	def get_db():
		con = sqlite3.connect("investimentos.db") 
		con.row_factory = sqlite3.Row 
		return con

	@staticmethod
	def obter_investimentos() -> list[Investimento]:
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
			return Exception

	@staticmethod
	def add_investimento(investimento: Investimento):
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
		except sqlite3.Error:
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
		except sqlite3.Error:
			return Exception

	@staticmethod
	def atualizar_investimento(investimento: Investimento):
		try:
			con = Database.get_db()

			cur = con.cursor()
			cur.execute(f"""UPDATE investimentos SET
				ticker = '{investimento.ticker.id}', data = '{investimento.data}',
				quantidade = {investimento.quantidade}, valor_unit = {investimento.valor_unit},
				tipo = '{investimento.tipo}', taxa_corretagem = {investimento.taxa_corretagem}

				WHERE codigo = {investimento.id}
			""")

			con.commit()
			con.close()
			
			return cur.rowcount > 0
		except sqlite3.Error:
			return Exception