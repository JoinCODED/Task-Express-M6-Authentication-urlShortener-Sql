# Url Shortener 🔗

## Instructions

- Fork and clone [this repository](https://github.com/JoinCODED/Task-Express-M6-Authentication-urlShortener-Sql) to your `Development` folder.

After forking the repository, you will find a fully functional url shortener!.

The goal is to prevent any unauthorized user from using our service.

### Signup Route

1. In `users.controllers`, create a method called `signup`.
2. Install `bcrypt` and require it in `users.controllers`.
3. Hash the password with `10` salt rounds and overwrite `req.body.password` with the new, hashed password.
4. Pass the body of the request to `User.create`.
5. Change the response status to `201` and end it with a message.

### Generating a Token

Generate a token in `users.controllers`'s `signup` method.

1. Install `jsonwebtoken`.
2. Require `jwt` from `jsonwebtoken`.
3. In `users.controllers`, create a function called `generateToken` that takes `user` as an argument.
4. In this function, create an object called `payload` and pass it the user's `username` that's coming from `user`.
5. Keep in mind that the token **must** have the user's ID and the expiration date of the token.
6. Add an `exp` property to `payload` and its value is the date right now plus `JWT_EXPIRATION_MS`.
7. After creating your `payload` object, call `jwt.sign()` and pass it two arguments:
   1. `payload`, make sure to stringify it.
   2. `JWT_SECRET`
8. Save the returned value in a variable called `token` and return `token`.
9. In the `signup` method, after creating the user call `generateToken` and pss it the new user.
10. Save the returned value in a variable called `token` and send it as a response.

### Passport Setup

1. Install `passport` and `passport-local`.
2. Require `passport` in `app.js`.
3. Call the `app.use` method and pass it `passport.initialize()`.

### Local Strategy

1. In `middleware`, create a file called `passport.js`.
2. Require `LocalStrategy` from `passport-local`.
3. Create a variable called `localStrategy` that's equal to a `LocalStrategy` instance.
4. Pass `LocalStrategy` an asynchronous function as an argument. This function receives three parameters: `username`, `password` and `done`.
5. Add a `try catch` statement in the function. In the `catch` block, call `done` and pass it `error`.
6. Look for a `user` in the `User` model that has the `username` that's passed to the local strategy. Save it in a variable called `user`.
7. Don't forget to import `User`.
8. Import `bcrypt`.
9. If `user` exists, call `bcrypt.compare()` and pass it `password` and `user.password` for comparison.
10. Save the returned value in a variable called `passwordsMatch`.
11. If `user` doesn't exist, set `passwordsMatch` to `false`.
12. If `passwordsMatch` is `true`, return `done()` and pass it two arguments, `null` and `user`.
13. Else, return `done()` and pass it two arguments, `null` and `false`.
14. In `app.js`, require the `localStrategy` instance that we just created.
15. Under the passport initialization, call `passport.use()` and pass it `localStrategy`.
16. In the `/signin` route, call `passport.authenticate()` and pass it "`local`" and `{ session: false }` as arguments.
17. Test your route in Postman.

### Config Folder

1. Create a new folder called `config`.
2. In this folder create a file called `keys.js`.
3. Create an object that has two properties:
   `JWT_SECRET`: give it a secret key.
   `JWT_EXPIRATION_MS`: give it the time for your token expiration in milliseconds.
4. Export this object

### Generating a Token

Generate a token in `user` controller's `signin` function.

1. Require `JWT_EXPIRATION_MS` and `JWT_SECRET` from `config/keys.js`.
2. Install `jsonwebtoken`.
3. Require `jwt` from `jsonwebtoken`.
4. In the `signin` function, create an object called `payload` and pass it the `user`'s information that's coming from `req.user`.
5. Keep in mind that the `token` must have the `user`'s ID and the expiration date of the token.
6. Add an `expires` property to `payload` and its value is the date right now plus `JWT_EXPIRATION_MS`.
7. After creating your payload object, call `jwt.sign()` and pass it two arguments:
   `payload`, make sure to stringify it.
   `JWT_SECRET`
8. Save the returned value in a variable called `token`.
9. Send `token` as a json response.

### Signin After Signup

1. In the user controller's signup function, create a payload object that takes its details from newUser and encrypt it.

2. Pass the token as a reponse.

### JWT Strategy

1. Start with installing the `JWT strategy`.

2. In `middleware/passport.js` require `JWTStrategy`.

3. We will create a JWT strategy instance, which takes two arguments, an `options` object and a callback function.

4. Tokens can be extracted from the request in many ways. We will pass our token in the request's authorization header with the scheme bearer. We need to require `fromAuthHeaderAsBearerToken`.

5. Now we will pass this method to our `options` object. Also, we will pass our `secret key` we defined in `config/keys.js`.

6. Now the second argument, an asynchronous callback function, takes two arguments, the token's payload and done method. So the JWT strategy decodes the token and passes the payload as an argument.

7. Check if the token is expired or not by comparing the expiration date to the date right now. If the token is expired, call `done` and pass it `null` and `false` as arguments, which will throw a `401` error.

8. If the token is not expired, we will find the `user` with the ID saved in the token. You can use `findOne` and pass it the `username`. Then we will pass the found `user` to `done`. If no `user` is found, it will throw a `401` error.

9. Let's initialize our strategy in `app.js`. Require `jwtStrategy` and pass it to `passport.use()`.

### 🍋 :userId

In the `shorten`, use `req.user` instead of the route param.

### 🌶️ Permissions!

If the user is not the one who created the url, don't allow him to delete it!
