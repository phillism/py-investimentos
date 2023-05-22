var table = document.querySelector('#all .table')
var table_body = table.querySelector('tbody')

async function carregarInvestimentos() {
    filtro = document.querySelector('#filtro-ticker')

    try {
        data = await obterInvestimentos()
        table_body.innerHTML = ``

        data.reverse()

        data.forEach(d => {
            if (!d.id) {
                return
            } else {
                if (filtro.value) {
                    if (!d.ticker.cod.includes(filtro.value.toUpperCase())) {
                        return
                    }
                }
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

            const { ticker, tipo, taxa_corretagem, quantidade, valor_unit, data } = d
            const { logo_url, cod } = ticker

            celId.innerHTML = d.id;
            celTicker.innerHTML = `<img src="${logo_url}" /> ${cod}`
            celData.innerHTML = `${data}`
            celQuantidade.innerHTML = `${quantidade}`
            celValorAcao.innerHTML = `${formatar(valor_unit)}`
            celTipo.innerHTML = `${tipo}`
            celValor.innerHTML = `${formatar(taxa_corretagem)}`
            
            let valor_op = quantidade * valor_unit;
            let valor_final = 0
            
            let imposto = valor_op * 0.0003;

            if (tipo == "C") {
                valor_final = (valor_op + imposto + taxa_corretagem).toFixed(2);
            } else {
                valor_final = (valor_op - imposto - taxa_corretagem).toFixed(2);
            }

            celValorOp.innerHTML = `${formatar(valor_op)}`
            celImposto.innerHTML = `${formatar(imposto)}`
            celValorFinal.innerHTML = `${formatar(Number(valor_final))}`
            celAcao.innerHTML = `
            <button class="del-button" onclick="deletarInvestimento(${d.id})" cod="${d.id}">Excluir</button>
            <button class="edit-button" onclick="editarInvestimento(${d.id})" cod="${d.id}">Editar</button>
            `
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

async function editarInvestimento(id) {
    edit = document.querySelector('#edit')
    data = await obterInvestimento(id)

    data_split = data.data.split("/")

    edit.querySelector('#ticker').value = data.ticker.cod
    edit.querySelector('#data').value = `${(data_split[2])}-${(data_split[1])}-${(data_split[0])}`
    edit.querySelector('#qnt').value = data.quantidade
    edit.querySelector('#ativo').value = data.valor_unit
    edit.querySelector('#tx').value = data.taxa_corretagem
    edit.querySelector('#id').setAttribute('value', id)

    if (data.tipo == 'V') {
        edit.querySelector('#compra').checked = false
        edit.querySelector('#venda').checked = true
    }
    
    section = table_body.querySelector(`[inv-id="${id}"]`)
    document.querySelector('#edit h2').innerHTML = `Atualizar investimento (#${id})`
    toggleEditar()
}

document.addEventListener('DOMContentLoaded', () => {
    carregarInvestimentos()
})