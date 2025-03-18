from django.shortcuts import render
from rest_framework import generics,status
from .serializers import UserInfoSerializer,WorkoutRequestSerializer
from .models import UserInfo
import openai
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
# Create your views here.

class GenerateWorkoutPlanView(APIView):
    def post(self, request):
        serializer = WorkoutRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            user_data = serializer.validated_data
            prompt = f"""
Create a weekly workout timetable and nutrition plan for {user_data['first_name']} {user_data['last_name']}, {user_data['age']} years old, {user_data['height']} cm, {user_data['weight']} kg.
Their goal is {user_data['goal']}.

IMPORTANT: Your response must be ONLY valid JSON with no additional text or explanation. Format as follows:
{{
  "Monday": {{
    "Workout": ["Exercise 1: 3 sets of 10 reps", "Exercise 2: 4 sets of 8 reps"],
    "Nutrition": ["Breakfast: Example meal", "Lunch: Example meal", "Dinner: Example meal", "Snacks: Example snack"]
  }},
  "Tuesday": {{
    "Workout": ["Exercise 1: 3 sets of 10 reps", "Exercise 2: 4 sets of 8 reps"],
    "Nutrition": ["Breakfast: Example meal", "Lunch: Example meal", "Dinner: Example meal", "Snacks: Example snack"]
  }},
  ...and so on for each day
}}
"""
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY,base_url="https://openrouter.ai/api/v1") 
            
            response = client.chat.completions.create(  
                model="qwen/qwen2.5-vl-72b-instruct:free",  
                messages=[{"role": "user", "content": prompt}],
            )
            

            workout_plan = response.choices[0].message.content  
            return Response({"workout_plan": workout_plan}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class Info(generics.RetrieveUpdateAPIView):
    queryset=UserInfo.objects.all()
    serializer_class=UserInfoSerializer
    lookup_field = "id"
    
class Fill(generics.CreateAPIView):
    queryset=UserInfo.objects.all()
    serializer_class=UserInfoSerializer
    lookup_field = "id"

class DeleteInfo(generics.DestroyAPIView):
    queryset=UserInfo.objects.all()
    serializer_class=UserInfoSerializer
    lookup_field = "id"


