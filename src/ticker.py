import requests

BASE_URL = 'https://brapi.dev/api/quote'

class Ticker:
	tickers = []
    
	def __init__(self, id):
		self.id: str = id
		self.nome = None
		self.moeda = None
		self.imposto = None
		self.logo_url = None
		self.valido = None

		self.update()
	

	@staticmethod
	def exists(id: str):
		if not id:
			return False

		response = requests.get(f'{BASE_URL}/{id}')

		if not response or response.status_code != 200:
			return False
		
		content = response.json()
		
		return not (not content)


	def find_ticker(self, id: str):
		found = None

		if id and type(id) == str:
			for t in Ticker.tickers:
				if t.id.lower() == id.lower():
					found = t
					break
		else:
			found = id
		
		return found


	def update(self):
		found = self.find_ticker(self.id)

		if found:
			self.id = found.id
			self.nome = found.nome
			self.moeda = found.moeda
			self.imposto = found.imposto
			self.logo_url = found.logo_url
			self.valido = True
			return True
		
		response = requests.get(f'{BASE_URL}/{self.id}?fundamental=true')
		self.valido = False

		if response.status_code != 200:
			return False
		
		content = response.json()

		if not content or type(content['results']) != list:
			return False
		
		result = content['results'][0]
		self.valido = True
		self.id = result['symbol']
		self.moeda = result['currency']
		self.imposto = -1
		self.logo_url = result['logourl'] if 'logourl' in result else None
		Ticker.tickers.append(self)
		return True
