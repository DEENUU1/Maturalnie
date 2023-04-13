import datetime
import hashlib
# from backend import database
import database


def get_current_date_hash() -> bytes:
    """
    Returns the SHA256 hash of the current date as a bytes object.
    """
    current_date = datetime.date.today().isoformat()
    return hashlib.sha256(current_date.encode('utf-8')).digest()


def return_random_id() -> int:
    """
    Returns a random ID based on the current date hash and the number of questions in the database.
    """
    date_hash = get_current_date_hash()
    count = database.get_question_count()
    return int.from_bytes(date_hash, byteorder="big") % (count)

