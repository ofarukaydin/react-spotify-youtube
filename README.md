This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What's the purpose of this package?

This is a spotify clone that uses youtube as backend. It's my learning project for react.

### How does it work?

Python(FastAPI) is used at backend. It uses beatifulsoup module to fetch track url from youtube and passes to react-player.

### What is the fetching algorithm?

As simple as searching track artist + track title and returning the first result from youtube.

### Why use web crawler instead of Google API?

Google limits the usage of api for free users. It's a workaround for it and i must say it works pretty well.

[Live Demo](http://farukaydin.xyz/tubify)
