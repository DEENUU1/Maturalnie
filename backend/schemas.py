from pydantic import BaseModel


class QuestionBase(BaseModel):
    question: str
    description: str
    answer: str
    id: int


class QuestionContent(QuestionBase):
    class Config:
        orm_mode = True


class QuestionDelete(BaseModel):
    id: int

    class Config:
        orm_mode = True


class QuestionInfo(QuestionBase):
    id: int

    class Config:
        orm_mode = True


class AnswerBase(BaseModel):
    answer: str


class Answer(AnswerBase):
    class Config:
        orm_mode = True
