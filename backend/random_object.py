import datetime
import hashlib


def get_current_date():
    return datetime.date.today().isoformat()


def return_datetime_hash(date):
    date = get_current_date()
    return hashlib.sha256(date.encode('utf-8')).digest()

