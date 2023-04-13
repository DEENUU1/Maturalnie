from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from backend import models, schemas
from backend.random_object import return_random_id

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
models.Base.metadata.create_all(bind=engine)


def get_db() -> Session:
    """ 
    Returns a generator that provides a database session for a given request.
    """
    with SessionLocal() as db:
        yield db


def get_questions(db: Session, skip: int = 0, limit: int = 100):
    """ 
    Returns a list of questions from the database, with an optional limit and offset.
    """
    return db.query(models.QuestionModel).offset(skip).limit(limit).all()


def create_question(db: Session, question: schemas.QuestionBase) -> models.QuestionModel:
    """ 
    Creates a new question in the database. 
    """
    db_question = models.QuestionModel(
        question=question.question,
        description=question.description,
        answer=question.answer
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


def delete_question(db: Session, question: schemas.QuestionDelete):
    """ 
    Deletes a question from the database.
    """
    db_question = db.query(models.QuestionModel).filter(models.QuestionModel.id == question.id).first()
    db.delete(db_question)
    db.commit()
    return db_question


def update_question(db: Session, question: schemas.QuestionContent):
    """ 
    Updates an existing question in the database.
    """
    db_question = db.query(models.QuestionModel).filter(models.QuestionModel.id == question.id).first()
    db_question.description = question.description
    db_question.question = question.question
    db_question.answer = question.answer
    db.commit()
    db.refresh(db_question)
    return db_question


def get_question_count() -> int:
    """ 
    Returns the number of questions in the database.
    """
    db = SessionLocal()
    question_count = db.query(models.QuestionModel).count()
    return question_count


def get_random_question(db: Session):
    """ 
    Returns a random question from the database.
    """
    question_id = return_random_id()
    return db.query(models.QuestionModel).filter(models.QuestionModel.id == question_id).first()


