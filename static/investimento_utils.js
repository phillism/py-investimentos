const ajustarPrecoMedio = (investiments) => {
    let soma_total = 0
    let ultimo_pm = 0

    return investiments.map((i) => {
        i.valor_op = i.quantidade * i.valor_unit;
        
        i.imposto = i.valor_op * 0.0003;

        if (i.tipo == "C") {
            i.valor_final = i.valor_op + i.imposto + i.taxa_corretagem;
        } else {
            i.valor_final = i.valor_op - i.imposto - i.taxa_corretagem;
        }

        if (i.tipo == 'C') {
            soma_total += i.quantidade
            i.preco_medio = (((soma_total - i.quantidade) * ultimo_pm) + i.valor_final) / soma_total
        } else {
            soma_total -= i.quantidade
            i.preco_medio = ultimo_pm
        }

        i.lucro = i.preco_medio >= 0

        ultimo_pm = i.preco_medio

        return i
    })
}
