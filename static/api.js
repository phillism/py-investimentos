const apiUrl = window.location.origin

// Função para obter um investimento por ID
function obterInvestimento(id) {
  return axios.get(`${apiUrl}/investimentos/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

// Função para obter todos os investimentos
function obterInvestimentos() {
  return axios.get(`${apiUrl}/investimentos`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

// Função para adicionar um novo investimento
function adicionarInvestimento(investimento) {
  return axios.post(`${apiUrl}/investimentos`, investimento)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

// Função para atualizar um investimento existente
function atualizarInvestimento(id, investimento) {
  return axios.put(`${apiUrl}/investimentos/${id}`, investimento)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

// Função para remover um investimento existente
function removerInvestimento(id) {
  return axios.delete(`${apiUrl}/investimentos/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}
