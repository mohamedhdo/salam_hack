from rest_framework import serializers
from .models import UserInfo


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserInfo
        fields='__all__'
        
class WorkoutRequestSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    age = serializers.IntegerField()
    height = serializers.FloatField()
    weight = serializers.FloatField()
    goal = serializers.CharField(max_length=255)
