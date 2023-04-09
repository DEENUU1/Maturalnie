from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String
)
from database import Base


class QuestionModel(Base):
    __tablename__ = "question"

    id = Column(Integer, index=True)
    question = Column(String())
    answer = Column(String())
    is_active = Column(Boolean, default=True)