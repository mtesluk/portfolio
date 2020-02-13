FROM python:3.8-alpine



RUN apk update
WORKDIR /app

COPY ./ ./app

RUN pip install -r app/requirements.txt

ENTRYPOINT [ "flask" ]

CMD [ "run" ]