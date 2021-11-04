# React-Query & React-Hook-Form

> This project was built from [MerlinMason/NextProject](https://github.com/MerlinMason/NextProject), checkout that repo for further details.

This was an experiment to try out two libraries [React-Query](https://react-query.tanstack.com) and [React-Hook-Form](https://react-hook-form.com), with the aim of learning how they work and seeing if I can get them to play nicely together, all while improving my TypeScript skills.

## Running locally
The project uses [MockAPI.io](https://mockapi.io), you can create a free account there, create a resource called `users` configured like so:
![image](https://user-images.githubusercontent.com/3215478/140415976-5ac9c4da-e2c5-4d56-aa23-b0858c88da14.png)

You'll also have to modify the response of `GET /users` to:
```
{
  "data": "$mockData",
  "total": "$count"
}
```
Create a `.env.local` file in the root of the project with the following value `MOCK_API_BASE_URL=urlGivenToYouFromMockAPI.io`.
Finally, run `yarn && yarn dev` to install dependencies and start the `localhost:3000` dev server.
