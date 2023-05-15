const lista = [];

function toggleAdd() {
    cleanForm()
    
    var create = document.getElementById('create')
    display = create.style.display
    create.style.display = !display || display == 'none' ? 'flex' : 'none'
}

function toggleEdit() {
    cleanForm()

    var create = document.getElementById('edit')
    display = create.style.display
    create.style.display = !display || display == 'none' ? 'flex' : 'none'

    loadInvestiments()
}

async function updateLine() {
    var edit = document.getElementById('edit')

    var id = edit.querySelector("#id").value;
    var ticker = edit.querySelector("#ticker").value;
    var data = edit.querySelector("#data").value
    var qnt = edit.querySelector("#qnt").value;
    var valor_acao = edit.querySelector("#ativo").value;
    var funcao = edit.querySelector('input[name="funcao"]:checked').value;
    var tx_corretagem = edit.querySelector("#tx").value;

    if (data) {
        data = moment(data, "YYYY-MM-DD").format("DD/MM/YYYY");
    }

    investimento = {
        "ticker": ticker,
        "data": data,
        "quantidade": qnt,
        "valor_unit": valor_acao,
        "tipo": funcao.toUpperCase()[0],
        "taxa_corretagem": tx_corretagem
    }

    await updateInvestiment(id, investimento)
    await loadInvestiments()
    toggleEdit()
}

async function addLine() {
    var create = document.getElementById('create')

    var ticker = create.querySelector("#ticker").value;
    var data = create.querySelector("#data").value
    var qnt = create.querySelector("#qnt").value;
    var valor_acao = create.querySelector("#ativo").value;
    var funcao = create.querySelector('input:checked');

    var tx_corretagem = create.querySelector("#tx").value;

    if (!isValidData(ticker, data, qnt, valor_acao, tx_corretagem)) {
        return
    }

    data = moment(data, "YYYY-MM-DD").format("DD/MM/YYYY");

    op = funcao.getAttribute('value') == 'Venda' ? 'V' : 'C'
    
    try {
        const result = await addInvestiment({ticker, data, quantidade: qnt, valor_unit: valor_acao, tipo: op, taxa_corretagem: tx_corretagem})

        if (!result.id) {
            alert("Ocorreu um erro. Verifique se todos os campos são válidos!")
        } else {
            toggleAdd()
            loadInvestiments()
        }
    } catch (e) {
        console.log(e)
        if (e.response) {
            alert(e.response.data.erro)
        } else {
            alert("Ocorreu um erro.")
        }
        return
    }
}
