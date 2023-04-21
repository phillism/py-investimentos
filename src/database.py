import sqlite3
con = sqlite3.connect("investimentos.db")

cur = con.cursor()
cur.execute("""CREATE TABLE IF NOT EXISTS investimentos(
    codigo NUMERIC(6,0) PRIMARY KEY, 
    ticker VARCHAR(8) NOT NULL, 
    data DATE DEFAULT (date('now')), 
    quantidade INTEGER NOT NULL CHECK(quantidade >= 0), 
    valor_unit DECIMAL(10,2) NOT NULL, 
    tipo CHAR(1) NOT NULL CHECK(tipo IN ('V', 'C')), 
    taxa_corretagem DECIMAL(3,16) NOT NULL);
""")