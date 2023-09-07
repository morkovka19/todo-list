from typing import Any
from django.db import models
from django.db.models.query import QuerySet
from core.mixins import *
from core.constants import DA



# class StatusTodo(DateMixin):
#     status = models.BooleanField(default=False, unique=True)

#     def __str__(self):
#         return str(self.status)
    
#     class Meta:
#         verbose_name = 'Status'
#         verbose_name_plural = "Statuses"



class Process(DefaultMixin):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    description = models.CharField(max_length=DA.MAX_LENGTH_DESCRIPTION, null=False, blank=False)

    def __str__(self):
        return str(self.id)
    
    class Meta:
        verbose_name = 'Process'
        verbose_name_plural = "Processes"



class Todo(DateMixin, IsDeletedMixin):
    name = models.CharField(max_length=DA.MAX_LENTH_NAME, null=False, blank=False)
    description = models.CharField(max_length=DA.MAX_LENGTH_DESCRIPTION, null=False, blank=False)
    status = models.ForeignKey(Process, on_delete=models.SET_DEFAULT, default=1)
    #status = models.ForeignKey(StatusTodo, on_delete=models.CASCADE)
    

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Todo'
        verbose_name_plural = "Todos"




