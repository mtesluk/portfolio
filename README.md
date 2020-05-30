# Portfolio

My project to learn react and microservices on backend. It is still in progress.
https://mtesluk.github.io/portfolio/

Now:
![alt text](http://mateusz.tesluk.pl/Portfolio.jpg)
In future:
![alt text](http://mateusz.tesluk.pl/Portfolio_Move.jpg)

# ACCOUNT BACKEND TO AUTH
Python 3.8.3

## Requirements
```
pip install -r requirements.txt
```

## Dev Server
```
python manage.py runserver
```

## Prod Server
Dont forget abount env variables and $PORT.
What you need is in .env.cfg
```
docker build . -t account_img
docker run -it --name account_img -d account_container
```
OR from docker hub
```
docker run -it --name mtesluk/account -d account_container
```

## Deploy
You must be logged in to docker and heroku
```
docker login
heroku login
./deploy.sh
```

## Tests
```
python manage.py test
```

# BLOG BACKEND
Python 3.8.3

## Requirements
```
pip install -r requirements.txt
```

## Dev Server
```
export FLASK_APP=run.py
export FLASK_DEBUG=1
flask run
```

## Prod Server
Dont forget abount env variables and $PORT.
What you need is in .env.cfg
```
docker build . -t blog_img
docker run -it --name blog_img -d blog_container
```
OR from docker hub
```
docker run -it --name mtesluk/blog -d blog_container
```

## Deploy
You must be logged in to docker and heroku
```
docker login
heroku login
./deploy.sh
```

## Tests
```
python -m unittest discover
```

## Migrations
To init migrations dir:
```
flask db init
```
To add new migraton:
```
flask db migrate -m "Initial migration."
```
To upgrade db with existing migrations:
```
flask db upgrade
```




# GUI
App built in React with Typescript

## Server
```
npm run start
```

## Build
```
npm run build
```