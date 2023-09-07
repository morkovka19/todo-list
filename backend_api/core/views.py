from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from django.views.generic import ListView

from .models import Todo
from .serializers import TodoSerializer


def home(request):
    return render(request, "home.html")



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class =  TodoSerializer


        


@api_view(['POST'])
def post_search(request):
    name = request.data.get('name')
    print(name)
    todos = Todo.objects.all().filter(name=name)
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


# class Search(ListView):

#     def get():
    
    

    