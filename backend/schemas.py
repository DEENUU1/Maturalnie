from pydantic import BaseModel


class QuestionBase(BaseModel):
    id: int
    question: str
    answer: str
    is_active: bool

