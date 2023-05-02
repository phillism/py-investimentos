from ticker import Ticker
from datetime import datetime

class Investimento:
    
	def __init__(self, ticker: Ticker, data: datetime, quantidade: int, valor_unit: float, tipo: str, taxa_corretagem: float):
		self.id = id
		self.ticker = ticker
		self.data = data.strftime('%Y-%m-%d') if type(data) == datetime else data
		self.quantidade = quantidade
		self.valor_unit = valor_unit
		self.tipo = tipo
		self.taxa_corretagem = taxa_corretagem
	

	def calcular_valor_operacao(self):
		return -1
	

	def calcular_valor_final(self):
		return -1


	# Função que, a partir da tupla de valores passados, transforma-os em uma instância de Investimento
	# Exemplo de values: (1, 'XXXX', '21-21-2022', 102, 1999.9, 'V', 0.001)
	@staticmethod
	def _from(values):
		if not values or len(values) != 7:
			return None 

		id = values[0]
		ticker = Ticker(values[1])
		data = values[2]
		quantidade = int(values[3])
		valor_unit = float(values[4])
		tipo = values[5]
		taxa_corretagem = float(values[6])

		investimento = Investimento(ticker, data, quantidade, valor_unit, tipo, taxa_corretagem)
		investimento.id = id
		return investimento
	
	
	def json(self):
		self.ticker = Ticker(self.ticker)

		return {
			"id": self.id,

			"ticker": {
				"cod": self.ticker.id,
				"logo_url": self.ticker.logo_url,
				"currency": self.ticker.moeda
			},

			"data": self.data,
			"quantidade": self.quantidade,
			"valor_unit": self.valor_unit,
			"tipo": self.tipo,
			"taxa_corretagem": self.taxa_corretagem
		}
