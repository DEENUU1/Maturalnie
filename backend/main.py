from fastapi import FastAPI, Depends, HTTPException, Form, Response, Header
import database, schemas
from sqlalchemy.orm import Session
from typing import List, Annotated
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import auth

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
def create_question(question: schemas.QuestionContent,
                    db: Session = Depends(database.get_db),
                    token: str = Depends(auth.verify_token)):
    db_question = database.create_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(400, "Something went wrong")

@app.delete("/questions/{id}", response_model=schemas.QuestionDelete)
def delete_question(question: schemas.QuestionDelete, 
                    db: Session = Depends(database.get_db), 
                    token: str = Depends(auth.verify_token)):
    db_question = database.delete_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(404, "This question does not exist")


@app.put('/questions/{id}', response_model=schemas.QuestionInfo)
def update_question(question: schemas.QuestionInfo, 
                    db: Session = Depends(database.get_db), 
                    token: str = Depends(auth.verify_token)):
    db_question = database.update_question(db=db, question=question)
    if db_question:
        return db_question
    raise HTTPException(404, "This question does not exist")

@app.get("/questions/", response_model=List[schemas.QuestionInfo], response_model_exclude_unset=True)
def get_question_list(skip: int = 0, 
                      limit: int = 100, 
                      db: Session = Depends(database.get_db), 
                      token: str = Depends(auth.verify_token)):
    db_question = database.get_questions(db=db, skip=skip, limit=limit)
    if db_question:
        return db_question
    raise HTTPException(204, "There is no questions")


@app.get('/question/', response_model=schemas.QuestionContent)
def get_random_question(db: Session = Depends(database.get_db), 
                        token: str = Depends(auth.verify_token)):
    db_question = database.get_random_question(db=db)
    if db_question:
        return db_question
    raise HTTPException(204, "This question does not exist")


@app.post('/answer/')
def post_user_answer(answer: Annotated[str, Form()], 
                     db: Session = Depends(database.get_db)) -> Response:
    if answer:
        random_question = get_random_question(db)
        correct_answer = random_question.answer
        if answer == correct_answer:
            return JSONResponse(content={"success": "Correct answer"})
        return JSONResponse(content={"error": "Not correct answer"})
    raise HTTPException(400, "Invalid data")


