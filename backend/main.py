from fastapi import FastAPI, Depends, HTTPException
import database, models, schemas
from sqlalchemy.orm import Session


app = FastAPI()


@app.post("/questions/", response_model=schemas.Question)
def create_question(question: schemas.QuestionBase, db: Session = Depends(database.get_db)):
    db_question = database.create_question(db=db, question=question)
    return db_question


@app.get('/question/')
def get_random_question(db: Session = Depends(database.get_db)):
    db_question = database.get_random_question(db=db)
    return db_question