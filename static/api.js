const apiUrl = window.location.origin

// Função para obter um investimento por ID
function getInvestiment(id) {
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
function getInvestiments() {
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
function addInvestiment(investimento) {
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
function updateInvestiment(id, investimento) {
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
function removeInvestiment(id) {
  return axios.delete(`${apiUrl}/investimentos/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}
