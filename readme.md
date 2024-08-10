# Adventour - A Server Side Rendered Tour Booking Website

### [👉🏻 Click to see Live Demo 👈🏻](https://adventour.onrender.com/)

## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=black)
&nbsp;&nbsp;
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
&nbsp;&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
&nbsp;&nbsp;
![Mongoose](https://img.shields.io/badge/Mongoose-0081CB.svg?style=for-the-badge&logo=mongoose&logoColor=white)
&nbsp;&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-FFA000.svg?style=for-the-badge&logo=javascript&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-FFFF00.svg?style=for-the-badge&logo=ejs&logoColor=white)
&nbsp;&nbsp;
![HTML](https://img.shields.io/badge/HTML-d24e01.svg?style=for-the-badge&logo=html&logoColor=white)
&nbsp;&nbsp;
![CSS](https://img.shields.io/badge/CSS-0d47a1.svg?style=for-the-badge&logo=css&logoColor=white)
&nbsp;&nbsp;

### A ficitional Tour booking website made with

> -   NodeJS and ExpressJS
> -   MongoDB and Mongoose
> -   HTML CSS and JavaScript

### Features of the Web App

> -   It is a Server Side Rendered Website having EJS as the view engine
> -   Built the REST (REpresentational State Transfer) API with Node, Express and Mongoose
> -   The WebApp also implements MVC (Model-View-Controller) architecture
> -   Functionality of User Signup, login, reset account password using email is implemented
> -   User can make payment and book tour, see all tours, give reviews on a tour.
> -   Admin can delete, create and get all users, delete, create and get all tours, update and delete reviews
> -   Users can book a tour, update their profile, login , signup

### Some important modules used for Security purpose

```javascript
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
```

<!--  const helmet = require('helmet'); -->

> -   Rate Limit is the module used for limiting the no. of requests made by a client to the server.
> -   Mongo Sanitize sanitizes mongodb queries against NOSQL query injections.
> -   XSS modules help us to prevent cross site scripting attacks.
> -   HPP module helps us to prevent attacks against HTTP parameter pollution..
> -   Crypto module used for generating hash token for reset password functionality of the user.
> -   JWT is used for stateless authentication mechanisms for users and providers.
> -   Bcrypt to hash user password and then store them in the database instead of plain password for security purposes.

## Screenshots

-   #### Home Page

    <img src="./public/images/home.png" height="750px"  />

-   #### Profile Settings Page

    <img src="./public/images/profile.png" height="750px"  />

-   #### Login Page

    <img src="./public/images/login.png"  />

-   #### Signup Page
    <img src="./public/images/signup.png" />

    
