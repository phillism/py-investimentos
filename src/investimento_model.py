from datetime import date
from sqlalchemy import CheckConstraint

from datetime import date
from sqlalchemy import CheckConstraint, Column, Date, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Investimento(Base):
    __tablename__ = 'investimentos'
    codigo = Column(Integer, primary_key=True)
    ticker = Column(String(8), nullable=False)
    data = Column(Date, default=date.today(), nullable=False)
    quantidade = Column(Integer, CheckConstraint("quantidade >= 0"), nullable=False)
    valor_unit = Column(Float(precision=2), nullable=False)
    tipo = Column(String(1), CheckConstraint("tipo IN ('V', 'C')"), nullable=False)
    taxa_corretagem = Column(Float(precision=16), nullable=False)
