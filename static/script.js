const lista = [];


function toggleAdicionar() {
    var create = document.getElementById('create')
    display = create.style.display
    create.style.display = !display || display == 'none' ? 'flex' : 'none'
}

async function adicionarLinha() {
    var ticker = document.getElementById("ticker").value;

    if (ticker.trim() == "") {
        alert("Por favor, preencha o ticker.")
        return false;
    }

    var data = document.getElementById("data").value
    if (data.trim() == "") {
        alert("Por favor, preencha a data.");
        return false;
    }
    data = moment(data, "YYYY-MM-DD").format("DD/MM/YYYY");

    var qnt = document.getElementById("qnt").value;
    if (qnt.trim() == "" || Number(qnt) <= 0) {
        alert("O campo quantidade é inválido.");
        return false;
    }
    var valor_acao = document.getElementById("ativo").value;
    if (valor_acao.trim() == "" || Number(valor_acao) <= 0) {
        alert("O campo valor da ação está vazio.");
        return false;
    }


    var funcao = document.querySelector('input[name="funcao"]:checked').value;
    
    var tx_corretagem = document.getElementById("tx").value;
    if (tx_corretagem.trim() == "") {
        alert("O campo taxa de corretagem está vazio.");
        return false;
    }

    var valor_op = qnt * valor_acao;
    var imposto = 2;

    if (funcao == "Compra") {
        var valor_final = (valor_op + imposto).toFixed(2);
        op = '▲';
    } else if (funcao == "Venda") {
        var valor_final = (valor_op - imposto).toFixed(2);
        op = '▼';
    }
    
    try {
        const result = await adicionarInvestimento({ticker, data, quantidade: qnt, valor_unit: valor_acao, tipo: funcao.toUpperCase()[0], taxa_corretagem: tx_corretagem})

        if (!result.id) {
            alert("Ocorreu um erro. Verifique se todos os campos são válidos!")
        } else {
            toggleAdicionar()
            carregarInvestimentos()
        }
    } catch (e) {
        alert(e.response.data.erro)
        return
    }
}
