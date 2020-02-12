FROM python3.8.1-alpine3.11
RUN apk --update
WORKDIR /app

COPY ./requirements.txt ./app
RUN pip install -r requirements.txt