from fastapi import FastAPI, Depends, HTTPException, Request, Form
import database, schemas
from sqlalchemy.orm import Session
from typing import List, Annotated

app = FastAPI()


@app.post("/create/questions/", response_model=schemas.QuestionContent)
def create_question(question: schemas.QuestionContent, db: Session = Depends(database.get_db)):
    db_question = database.create_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(400, "Something went wrong")


@app.get("/questions/", response_model=List[schemas.QuestionInfo])
def get_question_list(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    db_question = database.get_questions(db=db, skip=skip, limit=limit)
    if db_question:
        return db_question
    raise HTTPException(404, "There is no questions")


@app.get('/question/', response_model=schemas.QuestionContent)
def get_random_question(db: Session = Depends(database.get_db)):
    db_question = database.get_random_question(db=db)
    if db_question:
        return db_question
    raise HTTPException(404, "This question does not exist")


@app.post('/answer/')
def post_user_answer(answer: Annotated[str, Form()], db: Session = Depends(database.get_db)):
    random_question = get_random_question(db)
    correct_answer = random_question.answer
    if answer == correct_answer:
        return {"message": "Correct answer"}
    return {"message": "Not correct answer"}