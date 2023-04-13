from sqlalchemy import (
    Column,
    Integer,
    String,
)
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class QuestionModel(Base):
    __tablename__ = "question"

    id = Column(Integer, index=True, primary_key=True)
    question = Column(String)
    description = Column(String) 
    answer = Column(String)
