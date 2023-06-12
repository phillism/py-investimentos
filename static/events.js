async function keyPressEvent(e) {
    const tickers = document.querySelector('#tickers')
    tickers.innerHTML = ``

    if (e.code == 'Space') {
        e.preventDefault()
    } else {
        const value = e.target.value
        if (value.length >= 1 && value.length <= 8) {
            const { data } = await axios(`https://brapi.dev/api/available?search=${value.toLowerCase()}`)
            data.stocks.forEach(stock => {
                tickers.innerHTML += `<option>${stock}</option>`
            })
        }
    }
}
