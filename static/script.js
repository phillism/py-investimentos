const lista = [];
function adicionarLinha() {
    var codigo_unico = document.getElementById("cod").value;
    const regex = /^[A-Za-z]{4}[0-9]{2}$/;


    if (!regex.test(codigo_unico)) {
        alert('O código de transação não segue a formatação adequada.');
        return;
    } else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] == codigo_unico) {
              alert("Código já existente!");
              return; // encerra a função
            }
          }
    }

    var data = document.getElementById("data").value
    if (data.trim() == "") {
        alert("Por favor, preencha a data.");
        return false;
    }
    data = moment(data, "YYYY-MM-DD").format("DD/MM/YYYY");

    var qnt = document.getElementById("qnt").value;
    if (qnt.trim() == "") {
        alert("O campo quantidade de ações está vazio.");
        return false;
    }
    var valor_acao = document.getElementById("ativo").value;
    if (valor_acao.trim() == "") {
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
    
    var codigo = document.querySelector("cod")
    console.log(codigo)

    lista.push(codigo_unico);

    console.log(codigo_unico)
    console.log(data)
    console.log(qnt)
    console.log(`$ ${valor_acao}`)
    console.log(tx_corretagem)
    console.log(`R$ ${valor_op.toFixed(2)} `)
    console.log(imposto.toFixed(2))
    console.log(`R$ ${valor_final}`)
    alert("Dados salvos")
}