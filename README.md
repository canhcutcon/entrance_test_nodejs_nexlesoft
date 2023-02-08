# entrance_test_nodejs_nexlesoft

#How to run 
npm install || npm i
npm start

## API

### Auth `/auth`
-   `[POST] /sign-up`: sign up.
    -   body: {email: String, password: String, firstName: String, lastName:String}.
    -   result: {
          "id": "<id of the user in the database>",
          "firstName": "<user first name>",
          "lastName": "<user last name>",
          "email": "<user email>",
          "displayName": "<firstName + last Name>"}
-   `[POST] /sign-in`: sign in.
    -   body: {email: String, password: String}.
    -   result: {
          "user": {
            "firstName": "<user first name>",
            "lastName": "<user last name>",
            "email": "<user email>",
            "displayName": "<firstName + last Name"
          },
          "token": "<jwt token>",
          "refreshToken": "<jwt refresh token>"
        }

-   `[POST] /refresh-token`: refresh token.
    -   body: {refreshToken: String}.
    -   result: {token: String, refreshToken: String}.

-   `[POST] /sign-out`: sign out.
    -   body: {}.
    -   result: {}.
