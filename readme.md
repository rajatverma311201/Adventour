# Adventour website

### [Click to see Live Demo](https://github.com/rajatverma311201/Adventour)

#### A ficitional Tour booking website made with

> - NodeJS and ExpressJS
> - MongoDB and Mongoose
> - HTML CSS and JavaScript

> - It is a Server Side Rendered Website having EJS as the view engine
> - Built the REST (REpresentational State Transfer) API with Node, Express and Mongoose
> - The WebApp also implements MVC (Model-View-Controller) architecture

### Some important modules used for Security purpose

```
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

```

> - rateLimit is the module used for limiting the no. of requests made by a client
> - Helmet helps us secure our Express.js apps by securing various HTTP headers.
> - Mongo Sanitize sanitizes mongodb queries against NOSQL query injections.
> - XSS modules help us to prevent cross site scripting attacks.
> - HPP module helps us to prevent attacks against HTTP parameter pollution
