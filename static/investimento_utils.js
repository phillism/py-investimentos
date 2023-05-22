const ajustarPrecoMedio = (investiments) => {
    let soma_total = 0
    let ultimo_pm = 0

    return investiments.map((i) => {

        if (i.tipo == 'C') {
            soma_total += i.quantidade
            i.preco_medio = (((soma_total - i.quantidade) * ultimo_pm) + i.total) / soma_total
        } else {
            soma_total -= i.quantidade
            i.preco_medio = ultimo_pm
        }

        ultimo_pm = i.preco_medio

        return i
    })
}
