from dotenv import load_dotenv, find_dotenv
from busboard.app import create_app

load_dotenv(find_dotenv())
app = create_app()