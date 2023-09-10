from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from django.views.generic import ListView
from django_filters.rest_framework import DjangoFilterBackend




from .models import Todo
from .serializers import TodoSerializer


def home(request):
    return render(request, "home.html")



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class =  TodoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('name',)



    def get_queryset(self):
        queryset=Todo.objects.all()
        name= self.request.query_params.get('name')
        if name is not None:
            queryset = queryset.filter(name=name)
        return queryset


    def list(self, request):
        if (request.GET.get('name')):
            name = request.GET.get('name')
            todos = Todo.objects.filter(name=name)
            serializer = TodoSerializer(todos, many=True)
            return Response(serializer.data)
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)


    