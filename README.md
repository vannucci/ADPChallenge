# ADP Challenge

## Installation guide
1. Clone repo
2. Run 'npm i'
3. Create .env file with following fields (proxy is not required, and can be left as ''):
```
    PROXY={url}
    GET_URL=https://interview.adpeai.com/api/v1/get-task
    POST_URL=https://interview.adpeai.com/api/v1/submit-task
    REQUEST_INTERVAL={number}
```
4. Run 'npm start' and watch it go! Request interval is the number of seconds it will take to make the first request.