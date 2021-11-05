# React-Query & React-Hook-Form

> This project was built from [MerlinMason/NextProject](https://github.com/MerlinMason/NextProject), checkout that repo for further details.

This was an experiment to try out two libraries [React-Query](https://react-query.tanstack.com) and [React-Hook-Form](https://react-hook-form.com), with the aim of learning how they work and seeing if I can get them to play nicely together, all while improving my TypeScript skills.

## Description
This project is a simple CRUD interface, displaying a list of users, allowing create, edit and delete actions. The data persistence is provided by [MockAPI.io](https://mockapi.io) and the requests are proxied through the NextJs backend to avoid revealing the MockAPI instance URL (the service provides no form of authentication).

The clientside data management is done through React-Query, with custom hooks created for the various actions.

The create and edit form is managed through React-Hook-Form, with custom form elements and validation.

![image](https://user-images.githubusercontent.com/3215478/140511162-ecb1dc1e-d807-4f6e-a718-b61a070dfb72.png)

![image](https://user-images.githubusercontent.com/3215478/140511229-26ddd62b-b457-471a-8e77-d56005d5862b.png)

![image](https://user-images.githubusercontent.com/3215478/140511299-8753154f-a978-4d81-9193-32fb5c3c5158.png)


## Running locally
The project uses [MockAPI.io](https://mockapi.io), you can create a free account there, then create a resource called `users` configured like so:

![image](https://user-images.githubusercontent.com/3215478/140415976-5ac9c4da-e2c5-4d56-aa23-b0858c88da14.png)

You'll also have to modify the response of `GET /users` to:
```
{
  "data": "$mockData",
  "total": "$count"
}
```
Create a `.env.local` file in the root of the project with the following value `MOCK_API_BASE_URL=https://<UNIQUE_ID>.mockapi.io`.
Finally, run `yarn` to install dependencies and `yarn dev` start the `localhost:3000` dev server.
