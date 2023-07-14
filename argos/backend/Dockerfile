FROM python:3.11 as dev

ENV PYTHONUNBUFFERED 1
ENV DJANGO_DEBUG True
ENV SECRET_KEY 'django-insecure-\$z%mlo2!g_y42(0k&awnae*v5h=*xubf+&c*w+3z-lorb3a4#j'
ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD root
ENV POSTGRES_HOST db

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY src /app

FROM python:3.11-alpine as prod

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_DEBUG False
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV POSTGRES_HOST db

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

RUN pip install gunicorn

COPY src /app