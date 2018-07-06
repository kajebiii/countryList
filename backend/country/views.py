from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import Response
import requests
import json


@api_view(['GET'])
def get_continent(request):
    try:
        data = requests.get('http://country.io/continent.json')
        if data.status_code == 200:
            data = json.loads(data.content.decode('utf8'))
            return Response(data)
        else:
            return Response("country.io server error", status=data.status_code)
    except Exception as e:
        print(e)
        return Response("server error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_names(request):
    try:
        data = requests.get('http://country.io/names.json')
        if data.status_code == 200:
            data = json.loads(data.content.decode('utf8'))
            return Response(data)
        else:
            return Response("country.io server error", status=data.status_code)
    except Exception as e:
        print(e)
        return Response("server error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def get_capital(request):
    try:
        data = requests.get('http://country.io/capital.json')
        if data.status_code == 200:
            data = json.loads(data.content.decode('utf8'))
            return Response(data)
        else:
            return Response("country.io server error", status=data.status_code)
    except Exception as e:
        print(e)
        return Response("server error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_phone(request):
    try:
        data = requests.get('http://country.io/phone.json')
        if data.status_code == 200:
            data = json.loads(data.content.decode('utf8'))
            return Response(data)
        else:
            return Response("country.io server error", status=data.status_code)
    except Exception as e:
        print(e)
        return Response("server error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


