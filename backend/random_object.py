import datetime
import hashlib
import database


def get_current_date_hash():
    current_date = datetime.date.today().isoformat()
    return hashlib.sha256(current_date.encode('utf-8')).digest()


def return_random_id() -> int:
    date_hash = get_current_date_hash()
    count = database.get_question_count()
    return int.from_bytes(date_hash, byteorder="big") % (count)

