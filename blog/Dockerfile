FROM python:3.8-alpine

WORKDIR /app

RUN apk update
RUN apk add --no-cache bash
RUN apk add --no-cache gcc musl-dev linux-headers libpq python3-dev postgresql-dev libressl-dev libffi-dev

COPY . .
RUN pip install -r requirements.txt

CMD gunicorn --bind 0.0.0.0:$PORT app.wsgi:app --reload