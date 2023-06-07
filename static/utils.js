function format(value) {
    retorno = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (value < 0) {
        console.log(typeof retorno)
        retorno = retorno.replace("-R$", "R$ -")
    }

    console.log(retorno)
    return retorno
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

const ajustarPrecoMedio = (investiments) => {
    let soma_total = 0
    let ultimo_pm = 0
    let lucro_prejuizo_total = 0

    investiments = investiments.map((i) => {
        i.valor_op = i.quantidade * i.valor_unit;
        
        i.imposto = i.valor_op * 0.0003;

        if (i.tipo == 'C') {
            i.valor_final = i.valor_op + i.imposto + i.taxa_corretagem;
            
            soma_total += i.quantidade
            i.preco_medio = (((soma_total - i.quantidade) * ultimo_pm) + i.valor_final) / soma_total
        } else {
            i.valor_final = i.valor_op - i.imposto - i.taxa_corretagem;

            soma_total -= i.quantidade
            i.preco_medio = ultimo_pm
            i.lucro_prejuizo = (i.valor_final - (i.preco_medio * i.quantidade))
            lucro_prejuizo_total += i.lucro_prejuizo
        }

        ultimo_pm = i.preco_medio

        return i
    })

    return {
        lucro_prejuizo_total,
        investiments
    }
}

const ajustarPrecoMedioGeral = (investiments) => {
    dados = {}
    investiments.reverse()


    lucro_prejuizo_total = 0

    investiments = investiments.map((i) => {
        i.valor_op = i.quantidade * i.valor_unit;
        i.imposto = i.valor_op * 0.0003;
        
        let dado = dados[i.ticker.cod.toUpperCase()]
        
        let soma_total = 0
        let ultimo_pm = 0
        if (dado) {
            soma_total = dado.soma_total
            ultimo_pm = dado.ultimo_pm
        } else {
            dados[i.ticker.cod.toUpperCase()] = {
                soma_total: 0,
                lucro_prejuizo_total: 0,
                ultimo_pm: 0
            }
        }

        dado = dados[i.ticker.cod.toUpperCase()]

        if (i.tipo == 'C') {
            i.valor_final = i.valor_op + i.imposto + i.taxa_corretagem;

            soma_total += i.quantidade

            i.preco_medio = (((soma_total - i.quantidade) * ultimo_pm) + i.valor_final) / soma_total
        } else {
            i.valor_final = i.valor_op - i.imposto - i.taxa_corretagem;

            soma_total -= i.quantidade

            i.preco_medio = ultimo_pm
            i.lucro_prejuizo = i.valor_final - (i.preco_medio * i.quantidade)
            lucro_prejuizo_total += i.lucro_prejuizo
        }

        dado.soma_total = soma_total
        dado.ultimo_pm = i.preco_medio
        

        return i
    })

    return {
        lucro_prejuizo_total, investiments
    }
}