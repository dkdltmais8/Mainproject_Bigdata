FROM python:3.6

WORKDIR /usr/src/app

COPY . .

WORKDIR ./BackEnd

Run pip install --upgrade pip && pip install -r requirements.txt

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000