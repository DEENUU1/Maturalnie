from fastapi.testclient import TestClient

from dotenv import load_dotenv
import os

from backend import main

load_dotenv()

client = TestClient(main.app)


def test_question_list():
    response = client.get(
        "/questions/",
        headers={'token': os.getenv("TOKEN")}
    )
    assert response.status_code == 200


def test_add_new_question():
    response = client.post(
        "/questions/",
        headers={'token': os.getenv("TOKEN")},
        json={"question": "test", "description": "test", "answer": "test"}
    )
    assert response.status_code == 200


# def test_update_existing_question():
#     response = client.put(
#         "/questions/1",
#         headers={'token': os.getenv("TOKEN")},
#         json={"question": "test"}
#     )
#     assert response.status_code == 200

# def test_edit_existing_question():
#     response = client.delete(
#         "/questions/1",
#         headers={'token': os.getenv("TOKEN")},
#     )
#     assert response.status_code == 200


def test_get_random_question():
    response = client.get(
        "/question/",
        headers={'token': os.getenv("TOKEN")},
    )
    assert response.status_code == 200


# def test_post_answer():
#     response = client.post(
#         "/answer/",
#         json={"answer": "test"}
#     )
#     assert response.status_code == 200