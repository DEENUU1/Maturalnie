from typing import List, Annotated

from fastapi import FastAPI, Depends, HTTPException, Form, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from . import auth
from . import database
from . import schemas

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/questions/", response_model=schemas.QuestionContent)
def create_question(
        question: schemas.QuestionContent,
        db: Session = Depends(database.get_db),
        token: str = Depends(auth.verify_token)
    ):
    """ 
    Create a new question.

    Args:
        question (schemas.QuestionContent): The details of the question to create.
        db (Session, optional): The database session. Defaults to Depends(database.get_db).
        token (str, optional): The JWT token. Defaults to Depends(auth.verify_token).

    Returns:
        schemas.QuestionContent: The newly created question.
    """

    db_question = database.create_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(400, "Something went wrong")


@app.delete("/questions/{id}", response_model=schemas.QuestionDelete)
def delete_question(
        question: schemas.QuestionDelete, 
        db: Session = Depends(database.get_db), 
        token: str = Depends(auth.verify_token)
    ):
    """ 
    Delete a question.

    Args:
        question (schemas.QuestionDelete): The details of the question to delete.
        db (Session, optional): The database session. Defaults to Depends(database.get_db).
        token (str, optional): The JWT token. Defaults to Depends(auth.verify_token).

    Returns:
        schemas.QuestionDelete: The deleted question.
    """

    db_question = database.delete_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(404, "This question does not exist")


@app.put('/questions/{id}', response_model=schemas.QuestionContent)
def update_question(
        question: schemas.QuestionContent,
        db: Session = Depends(database.get_db), 
        token: str = Depends(auth.verify_token)
    ):
    """ 
    Update a question.

    Args:
        question (schemas.QuestionContent): The details of the question to update.
        db (Session, optional): The database session. Defaults to Depends(database.get_db).
        token (str, optional): The JWT token. Defaults to Depends(auth.verify_token).

    Returns:
        schemas.QuestionInfo: The updated question.
    """

    db_question = database.update_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(404, "This question does not exist")


@app.get("/questions/", response_model=List[schemas.QuestionInfo], response_model_exclude_unset=True)
def get_question_list(
        skip: int = 0, 
        limit: int = 100, 
        db: Session = Depends(database.get_db), 
        token: str = Depends(auth.verify_token)
    ):
    """ 
    Get a list of questions.

    Args:
        skip (int, optional): The number of questions to skip. Defaults to 0.
        limit (int, optional): The maximum number of questions to return. Defaults to 100.
        db (Session, optional): The database session. Defaults to Depends(database.get_db).
        token (str, optional): The JWT token. Defaults to Depends(auth.verify_token).

    Returns:
        List[schemas.QuestionInfo]: A list of questions.
    """

    db_question = database.get_questions(db=db, skip=skip, limit=limit)
    if db_question:
        return db_question
    raise HTTPException(204, "There is no questions")


@app.get('/question/', response_model=schemas.QuestionContent)
def get_random_question(
        db: Session = Depends(database.get_db), 
        token: str = Depends(auth.verify_token)
    ):
    """ 
    Return a random question from the database.

    Args:
        db (Session): A SQLAlchemy session object.
        token (str, optional): A JWT token for authentication. Defaults to Depends(auth.verify_token).

    Returns:
        QuestionModel: A SQLAlchemy model representing the selected question.
    """

    db_question = database.get_random_question(db=db)
    if db_question:
        return db_question
    raise HTTPException(204, "This question does not exist")


@app.post('/answer/')
def post_user_answer(
        answer: Annotated[str, Form()], 
        db: Session = Depends(database.get_db)
    ) -> Response:
    """ 
    Check if the user's answer is correct.

    Args:
        answer (str): The user's answer to the question.
        db (Session): A SQLAlchemy session object.

    Returns:
        Response: A JSON response indicating if the user's answer was correct or not.
    """

    if answer:
        random_question = get_random_question(db)
        correct_answer = random_question.answer
        if answer == correct_answer:
            return JSONResponse(content={"success": "Correct answer"})
        return JSONResponse(content={"error": "Not correct answer"})
    raise HTTPException(400, "Invalid data")


