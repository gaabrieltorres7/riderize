# backend-test :genie:

## challenge context
Create an API that will allow the creation of pedals by users, in addition to that other users will be able to view these pedals and join them so that on the scheduled day those who signed up can pedal in a group.

## requirements :heavy_exclamation_mark:

- list the pedals that the user participated in;
- list the pedals that the user created;
- Do not allow enrollment in pedals after the last enrollment date;

To enable users to join pedals, the following data must be provided:
 - ride_id
 - user_id
 - subscription_date
 
 ## Techs used :technologist:
  - Node.js
  - TypeScript
  - Express
  - PostgreSQL
  - Prisma
  - Docker
  
## How to run this project:

you need to have Docker installed****

- Clone this repository: git clone https://github.com/gaabrieltorres7/riderize.git
- Install the dependencies: cd riderize > npm install
- Create a .env file and set the environment variables required.
- Start the database and app using Docker: docker compose up
- Run the database migrations: npx prisma migrate dev



