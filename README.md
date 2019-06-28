# ADP Challenge

## Installation guide
1. Clone repo
```
$ git clone https://github.com/vannucci/ADPChallenge.git
```
2. Install
```
$ npm install
```
3. Create `.env` file with following fields (`PROXY` is not required, can be left as an empty string):
```
    PROXY=
    GET_URL=https://interview.adpeai.com/api/v1/get-task
    POST_URL=https://interview.adpeai.com/api/v1/submit-task
    REQUEST_INTERVAL=10
```
4. Set `REQUEST_INTERVAL` to the number of seconds between API calls
5. Start the script
```
$ npm start
```