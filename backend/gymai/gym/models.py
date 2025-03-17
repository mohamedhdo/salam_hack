from django.db import models

# Create your models here.

class UserInfo(models.Model):
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    age=models.IntegerField()
    height=models.FloatField()
    weight=models.FloatField()
    goal=models.TextField()


