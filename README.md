# API
I decided to use NestJS for API development.

## Development enviornment
- `docker` version 20.10.*
- `docker-compose` version 2.13.*
- `nodejs`version 16.19.*
- `yarn` version 1.22.*

## Tools used in API
- Used `docker-compose` to quickly setup development environment such as pgqsl and redis server.
- Used `@nestjs/platform-express` to handle http request.
- Used `passport` to setup quick local authentication solution with `@nestjs/jwt`, `passport-jwt` and `passport-local` frameworks.
- Used `bcryptjs` for hashing password.
- Used `helmet` to protect against known web vulnerabilities.
- Used `swagger` to generate OpenAPI documentation.
- Used `redis` and `bull` framework to handle Queue works.
- Used `class-validator` and `class-transformer` to transform and validate DTOs.
- Used `@nestjs/terminus` library to get the health info of the running server.
- Used `prisma` for ORM and `pgsql` for database.

## Tools used in UI
- Used `create-react-app` to generate scaffolding.
- Used `zustand` for state management.
- Used `mantine` for UI framework.

## If I have more time
### For API
- I want to added more security protection such as `api-token` integration on top of `jwt`
- To integrate double csrf protection with `csrf-csrf` library.
- To integrate logging library for production purpose. Probably use `winston` library officialled proposed by `nestjs` team.
- Setup `husky` if we are working in team to make sure linting, formating and type checking.
- Create a Dockerfile and dockernized the app for production purpose.
- Probably setup terraform script for infrastructure setup.
- I didn't integrate any error tracking integration such as sentry or datadog. For production, it is important to integrate at least one of them for debuggin and monitoring in production.
- Last, but not least, I want to added testings such as unit testing and API testing.

### For UI
I honestly did not have much time to express what I can do with frontend framework. The reason is I decided to use `mantine` and `zustand` in this project. This is the first time using both framework and need to figure out and explore while doing exercise. So, not very productive. Typically I used `redux` and `redux-toolkit` for state management and `antd` for frontend UI. But, both `mantine` and `zustand` seem to be very good library. Even though, not so productive this time, I still feel I like both frameworks.

If I have more time, I want to do the following for UI
- I couldn't able to implement all the features, the following are the missing and important features.
  - Pagination
  - Update (Update feature has not implement on any of the resource)
  - Delete confirmation before actually deleting
  - Search with debounce in List pages.
  - Rich Text Area to send HTML based email for more formatting.
  - Sending emails to multiple users at the same time instead of inputting `toName` and `toEmail` manually, used the existing customer database to send bulk emails.
- I couldn't able to setup properly for axios interceptor for this project. Typically, I setup axios interceptor to inject `Authorization` header, instead of manually added for each request (not a good approach). If I have more time, I want to setup axios interceptor properly.
- I also do not have much time to setup to get a new access token with provided refresh token if the previous one is expired. I normally setup this in axios interceptor as well.
- I haven't checked properly about authentication and authomatic logout workflow. I'm not 100% sure if it's working now or not.
- I do not have much time to separate reusable React components, if I have more time, I would like to review the code again and create a reusable and more modular components.
- Again, I didn't add any testing code for this project coz of limited time, if I have time, I want to add component testing with `jest` framework and e2e testing with `playwright` framework.

## How to run this project
To understand how to run API and UI, please refer to Readme.md file inside each folder.