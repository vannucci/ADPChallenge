# Notes on solving this problem

## Monday, July 1, 2019
### Things to Do
1. Write tests, for whether the response object is valid JSON
1. What happens if the answer submitted is _incorrect_
1. What happens if question is misformatted, ie on the first call for task
1. Use Mocha/Chai? [Guide](https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71)
1. How to safely "throw" errors, like the JSON error or inbound/outbound errors [link](https://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling)

## Do To's for Monday
1. Implement some sort of linting
1. Write tests, try assertion library first, if not mocha
1. Try hosting it? Try logging it? But don't include these in the submitted version; fork it and keep adding stuff

## Future Features
* Deploy this to AWS/Heroku???
* Have it generate a view, responsive, which displays all the operations its done
* http://tryhandlebarsjs.com/
* What the actual hell should I be testing?????? How it fails when the HTTP requests die??
* THEN MAKE IT PARSEABLE (how.....?)
* Chaining promises         //Should I be chaining these promises, and how should I do that, exactly? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Chaining
* What should I pass through the promise rejects? So far I'm passing just 'false', but I think that's implied....
* I feel like the train mode can be simplified and made more succinct...
* I am going back and forth as to whether or not a good formatting but wrong answer should be a 400 error....
* Test: Test for a few things; malformed REST responses, test for what happens if the file is different or corrupted, and have the file be init'd if it's not there...
* Add in some sort of fixed length queue DS for managing the size of the allTasksDone file

## Problems
* Node appears to run out of memory when I run loops over promises. I need to figure out how to liberate memory from promises after it's done... [link](https://www.google.com/search?client=firefox-b-1-d&ei=Bw8VXeiCGLHy5gK2rqeICQ&q=js+running+out+of+memory+while+loop+promises&oq=js+running+out+of+memory+while+loop+promises&gs_l=psy-ab.3...1605.3435..3555...0.0..0.186.1112.2j7......0....1..gws-wiz.......0i71j33i299j33i160.BMitlhdm3kI)
* I don't know why, without process.exit(), the script doesn't stop...?
* Current Operation is multiplication, left 8762932318462125 and right 2486085351776365. What do you want to try?getTask error: SyntaxError: Unexpected identifier PROBLEM OH NO
* [Promises in loops](https://itnext.io/https-medium-com-popov4ik4-what-about-promises-in-loops-e94c97ad39c0)
* [Many promises in sequence](https://stackoverflow.com/questions/34191788/how-to-process-a-big-array-applying-a-async-function-for-each-element-in-nodejs)
* [Possibly use async await](https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/)

## Basic Functions
* [Appending to JSON file](https://stackoverflow.com/questions/36093042/how-do-i-add-to-an-existing-json-file-in-node-js)
* [Getting command line input in Node](https://flaviocopes.com/node-input-from-cli/)

## Interactive Mode with Interrupt
* [Interrupt](https://stackoverflow.com/questions/20165605/detecting-ctrlc-in-node-js)
* [Getting readline to work how I want it to](https://stackoverflow.com/questions/45402896/node-js-readline-pause-code)
* [Getting readline to work properly](https://stackoverflow.com/questions/18193953/waiting-for-user-to-enter-input-in-node-js)

## Sending JSON in body with RequestJS
* [Link](https://github.com/request/request/issues/1717)

## Notes

* Using Postman to test actual answer, first
* Make sure to record thought processes
* I need to make sure that my requests and my sends are properly accounting for async operations. I _still_ forget this when I'm writing and in my writing fugue 
* Gotta work on NAMING, and also have to practice writing PROMISES

## Resources
[Request JS](https://github.com/request/request)
[Keyboard interrupt](https://stackoverflow.com/questions/20165605/detecting-ctrlc-in-node-js)
[Eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)
[Posting JSON in body with Postman](https://stackoverflow.com/questions/39008071/send-post-data-via-raw-json-with-postman)
[Sending JSON body POST in RequestJS](https://github.com/request/request/issues/1717)
[I tried async/await, went with Promises](https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb)
[Used Promises, syntax is more familiar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Chaining)
[More on Promises](https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a)
[Gotta rate limit that shit, yo](https://stackoverflow.com/questions/2924330/how-can-i-rate-limit-how-fast-a-javascript-function-allows-itself-to-be-called)
[Parsing command line](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
[Check if object contains key](https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript)