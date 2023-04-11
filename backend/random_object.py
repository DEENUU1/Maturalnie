import datetime
import hashlib
from database import get_question_count


def get_current_date_hash():
    current_date = datetime.date.today().isoformat()
    return hashlib.sha256(current_date.encode('utf-8')).digest()


def return_random_id() -> int:
    date_hash = get_current_date_hash()
    count = get_question_count()
    return int.from_bytes(date_hash, byteorder="big") % (count + 1)


