from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


    def create(self, validated_date):
        return Todo.objects.create(**validated_date)
    

    def update(self, instance, validate_data):
        instance.name = validate_data.get('name', instance.name)
        instance.description = validate_data.get('description', instance.description)
        instance.status = validate_data.get('status', instance.status)
        instance.save()
        return instance