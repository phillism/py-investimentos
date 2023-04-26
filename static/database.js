var table = document.querySelector('#all .table')
var table_body = table.querySelector('tbody')

async function carregarInvestimentos() {

    try {
        data = await obterInvestimentos()
        table_body.innerHTML = ``

        data.reverse()

        data.forEach(d => {
            if (!d.id) {
                return
            }

            var linha = table_body.insertRow();
            linha.setAttribute('inv-id', d.id)

            // Adiciona as células na nova linha
            var celId = linha.insertCell();
            var celTicker = linha.insertCell();
            var celData = linha.insertCell();
            var celQuantidade = linha.insertCell();
            var celValorAcao = linha.insertCell();
            var celTipo = linha.insertCell();
            var celValor = linha.insertCell();
            var celValorOp = linha.insertCell();
            var celImposto = linha.insertCell();
            var celValorFinal = linha.insertCell();
            var celAcao = linha.insertCell();

            celId.innerHTML = d.id;
            celTicker.innerHTML = `<img src="${d.ticker_url}" /> ${d.ticker}`
            celData.innerHTML = `${d.data}`
            celQuantidade.innerHTML = `${d.quantidade}`
            celValorAcao.innerHTML = `${d.valor_unit}`
            celTipo.innerHTML = `${d.tipo}`
            celValor.innerHTML = `${d.taxa_corretagem}`
            celValorOp.innerHTML = `Desenvolvimento`
            celImposto.innerHTML = `Desenvolvimento`
            celValorFinal.innerHTML = `Desenvolvimento`
            celAcao.innerHTML = `<button onclick="deletarInvestimento(${d.id})" cod="${d.id}">Excluir</button>`
        }) 
    } catch(e) {
        console.log(e)
        return
    }
}

async function deletarInvestimento(id) {
    section = table_body.querySelector(`[inv-id="${id}"]`)
    if (section) {
        try {
            section.remove()
            response = await removerInvestimento(id)
        } catch (e) {
            console.log(e)
            alert("Ocorreu um erro! Tente novamente mais tarde.")
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarInvestimentos()
})