FROM python:3.8-alpine

WORKDIR /app

ENV FLASK_APP run.py

RUN apk update
RUN apk add --no-cache bash
RUN apk add --no-cache gcc musl-dev linux-headers mariadb-dev

COPY . .
RUN pip install -r requirements.txt
CMD ["flask", "run"]