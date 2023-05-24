function format(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function format_data(data) {
    const partes = data.split('-'); // Divide a data em partes (ano, mês, dia)
    const dia = partes[2];
    const mes = partes[1];
    const ano = partes[0];
    
    return `${dia}/${mes}/${ano}`; // Retorna a data formatada
  }


/*
Função que verifica se os campos de um formumário são válidos ou não.
Caso qualquer um não seja, um alerta será emitido e o valor 'false' será retornado.
*/
function isValidData(ticker, data, quantidade, valor_acao, taxa_corretagem) {
    if (!ticker || ticker.trim() == "") {
        alert("Por favor, preencha o ticker.")
        return false;
    }

    if (!data | data.trim() == "") {
        alert("Por favor, preencha a data.");
        return false;
    }

    if (!quantidade || quantidade.trim() == "" || Number(quantidade) <= 0) {
        alert("O campo quantidade é inválido.");
        return false;
    }
    
    if (!valor_acao || valor_acao.trim() == "" || Number(valor_acao) <= 0) {
        alert("O campo valor da ação é inválido.");
        return false;
    }


    if (!taxa_corretagem || taxa_corretagem.trim() == "" || Number(taxa_corretagem) < 0) {
        alert("O campo taxa de corretagem é inválido.");
        return false;
    }

    return true
}

function limparFormulario() {
    var ticker = document.getElementById("ticker");
    var data = document.getElementById("data")
    var qnt = document.getElementById("qnt");
    var valor_acao = document.getElementById("ativo");
    var funcao = document.querySelector('input[name="funcao"]:checked');
    var tx_corretagem = document.getElementById("tx");

    ticker.value = ''
    data.value = ''
    qnt.value = ''
    valor_acao.value = ''
    funcao.value = ''
    tx_corretagem.value = ''
}