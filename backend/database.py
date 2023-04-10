from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import models, schemas
from models import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_questions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.QuestionModel).offset(skip).limit(limit).all()


def create_question(db: Session, question: schemas.QuestionBase):
    db_question = models.QuestionModel(
        question=question.question,
        answer=question.answer
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


# Function to get a random id of a object based on local time
def get_random_id():


# Function to return a random object
def get_question():
    pass


# guess the answer
# post check if user posted a correct answer
def guess_answer():
    pass