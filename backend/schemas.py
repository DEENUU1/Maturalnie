from pydantic import BaseModel


class QuestionBase(BaseModel):
    question: str
    answer: str


class Question(QuestionBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class QuestionCount(QuestionBase):
    id: int

