import jwt
from fastapi import Header, HTTPException
from dotenv import load_dotenv
import os 

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def verify_token(token: str = Header(None)) -> str:
    """ 
    Verify the authenticity of the token.  
    """
    
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = decoded_token["username"]
        return username
    except:
        raise HTTPException(status_code=401, detail="Invalid token.")

