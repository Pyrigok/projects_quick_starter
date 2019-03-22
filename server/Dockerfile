FROM python:3.7

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/server
COPY requirements.txt /app/server
RUN pip3 install -r requirements.txt

EXPOSE 8000
CMD ["python3", "manage.py", "runserver", "127.0.0.1:8000"]