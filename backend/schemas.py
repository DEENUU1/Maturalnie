from pydantic import BaseModel


class QuestionBase(BaseModel):
    question: str
    answer: str


class QuestionContent(QuestionBase):
    class Config:
        orm_mode = True


class QuestionInfo(QuestionBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
