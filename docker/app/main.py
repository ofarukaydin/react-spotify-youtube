from fastapi import FastAPI
import urllib.request
import bs4
from starlette.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http:localhost", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/search")
def read_item(q: str = None):
    textToSearch = q
    query = urllib.parse.quote(textToSearch)
    url = "https://www.youtube.com/results?search_query=" + query
    response = urllib.request.urlopen(url)
    html = response.read()
    soup = bs4.BeautifulSoup(html, 'html.parser')
    vid = soup.findAll(attrs={'class': 'yt-uix-tile-link'})
    return {"url": 'https://www.youtube.com' + vid[0]['href']}
