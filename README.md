# news-aggregator

Build a news
aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format

Stack use Next.js frontend, Laravel backend, and Mysql database. Containerize everything using Docker and Docker Compose.

#Product Structure: <br>
App Name `news-aggregator` then enter inside after that you see `backend` and `frontend`

**_ Backend Laravel Install _**

1. Go into the folder `backend` then open terminal & run command `npm install`

2) After install then run `npm run start:dev`
3) Then you will get url for backend: `http://localhost:3000/`

**_ Front-end NextJS Install _**

1. Go into the folder `frontend` then open terminal & run command `composer install`

2) After install then run `php artisan serve`
3) Then you will get url for backend: `http://localhost:8000/`

**\_ DB Mysql**

1. Go into the folder `news-aggregator` then open terminal & run command `php artisan migrate`

**_ By Docker Installation _**

1. Go `news-aggregator` into the root folder then run `docker-compose up --build`
2. After starting your containers with docker-compose up, run the migration manually
   ` php artisan news:fetch`

## After Install you will get Frontend & Backend

Frontend Link: http://localhost:8000/ <br>
Backend Link: http://localhost:3000/

## Preview of Home Page Feature

Here is a preview of the Home Page feature:

![Home Pack Feature](https://github.com/itjewel/news-aggregator/blob/main/screenshort/homePage.png)

## Preview of Login

Here is a preview of the Login:

![Post Restaurant Api](https://github.com/itjewel/news-aggregator/blob/main/screenshort/login.png)

## Preview of Register

Here is a preview of the Register:

![Food Pack Api](https://github.com/itjewel/news-aggregator/blob/main/screenshort/register.png)

## Preview add preference

Here is a preview of add preference:

![Food Pack Api](https://github.com/itjewel/news-aggregator/blob/main/screenshort/add_prefrence.png)

## Preview List of preference

Here is a preview of preferences:

![Food Pack Api](https://github.com/itjewel/news-aggregator/blob/main/screenshort/preferences.png)
