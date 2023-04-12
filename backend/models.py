from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    Unicode
)
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class QuestionModel(Base):
    __tablename__ = "question"

    id = Column(Integer, index=True, primary_key=True)
    question = Column(String)
    answer = Column(String)
    is_active = Column(Boolean, default=True)
