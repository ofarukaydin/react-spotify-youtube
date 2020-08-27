from fastapi import FastAPI
import urllib.request
import bs4
import re
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


@app.get("/api/search")
def read_item(q: str = None):
    vid_urls = []
    textToSearch = q
    search_term = urllib.parse.quote(textToSearch)
    url = "https://www.youtube.com/results?search_query=" + search_term
    response = urllib.request.urlopen(url)
    html = response.read()
    soup = bs4.BeautifulSoup(html, 'html.parser')
    print(soup)
    vid = soup.findAll(attrs={'class': 'yt-uix-tile-link'})

    all_vid_id = re.findall(r'/watch\?v=(.{11})', str(soup))
    if len(all_vid_id) >= 1:
        for vid_id in all_vid_id:
            vid_url = "https://www.youtube.com/watch?v=" + str(vid_id)
            vid_urls.append(vid_url)
        return {"url": vid_urls[0]}
    else:
        return 'Could not find any results with the query term: ' + search_term
