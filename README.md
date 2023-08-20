# project-node1

## Inorder to use it, first you have to download its ZIP file of Fork the project on your Local Machine.
1. Connect it to your MongoDB or run `Mongosh` command in the terminal.
2. `npm i` - to install all the dependencies.
3. `npm start`

Then you can make requests on the appropriate url's using Postman. It has url's for fetching details about all the users that are in your database. You can create new users and also delete them.

## Get Request:
`http://localhost:8000/api/users/`<br/>
You can also get a particular user if you have it's id and append it at the end of the get request.

## Post Request:
The url is same as of the GET request additionlly you would have to add appropriate values in the key-value pair in the `x-www-url-form-urlencoded` form.

## Delete Request:
`http://localhost:8000/api/users/:id`<br/>
This deletes the user from the database.
