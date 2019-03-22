FROM python:3.7

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/server
COPY requirements.txt /app/server
RUN pip3 install -r requirements.txt
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

EXPOSE 8000
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
