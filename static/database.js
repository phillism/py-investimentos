var table = document.querySelector('#all .table')
var table_body = table.querySelector('tbody')

async function carregarInvestimentos() {
    filtro = document.querySelector('#filter-ticker')

    try {
        data = ajustarPrecoMedioGeral(await obterInvestimentos())
        table_body.innerHTML = ``

        // data.reverse()

        data.forEach(d => {
            if (!d.id) {
                return
            } else {
                if (filtro && filtro.value) {
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
            var celPM = linha.insertCell();
            var celLP = linha.insertCell();
            var celAcao = linha.insertCell();
            const { ticker, tipo, taxa_corretagem, quantidade, valor_unit, data, lucro_prejuizo, preco_medio } = d
            const { logo_url, cod } = ticker

            celId.innerHTML = d.id;
            celTicker.innerHTML = `
            <div class="ticker-container">
                <a class="ticker-redirect-button" href="/ticker/${ticker.cod}"><img class="ticker-icon" src="${logo_url}" /> ${cod}<img src="/static/img/link-thin.svg" /></a>
            </div>
            `

            celData.innerHTML = `${format_data(data)}`
            celQuantidade.innerHTML = `${quantidade}`
            celValorAcao.innerHTML = `${format(valor_unit)}`
            celTipo.innerHTML = `${tipo}`
            celValor.innerHTML = `${format(taxa_corretagem)}`
            
            let valor_op = quantidade * valor_unit;
            let valor_final = 0
            
            let imposto = valor_op * 0.0003;

            if (tipo == "C") {
                valor_final = (valor_op + imposto + taxa_corretagem).toFixed(2);
            } else {
                valor_final = (valor_op - imposto - taxa_corretagem).toFixed(2);
            }

            celValorOp.innerHTML = `${format(valor_op)}`
            celImposto.innerHTML = `${format(imposto)}`
            celPM.innerHTML = `${format(preco_medio)}`
            celLP.innerHTML = lucro_prejuizo ? `${format(lucro_prejuizo)}` : "-"
            celValorFinal.innerHTML = `${format(Number(valor_final))}`
            celAcao.innerHTML = `
            <button class="del-button" onclick="deleteInvestiment(${d.id})" cod="${d.id}"><i class="fa-solid fa-trash-can"></i> Excluir</button>
            <button class="edit-button" onclick="editInvestiment(${d.id})" cod="${d.id}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
            `
        }) 
    } catch(e) {
        console.log(e)
        return
    }
}

async function deleteInvestiment(id) {
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

async function editInvestiment(id, editing = false) {
    edit = document.querySelector('#edit')
    data = await obterInvestimento(id)

    data_split = data.data.split("/")
    edit.querySelector('#ticker').value = data.ticker.cod
    edit.querySelector('#data').value = data.data
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
    toggleEditar(editing)
}

