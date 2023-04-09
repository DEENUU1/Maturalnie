from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String
)


class QuestionModel():
    __tablename__ = "question"

    id = Column(Integer, index=True)
    question = Column(String())
    answer = Column(String())
    is_active = Column(Boolean, default=True)