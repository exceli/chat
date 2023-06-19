FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV HOME=/home/app

WORKDIR $HOME

RUN pip install --upgrade pip

COPY ./requirements.txt $HOME/requirements.txt
RUN pip install -r $HOME/requirements.txt

COPY . $HOME/server/