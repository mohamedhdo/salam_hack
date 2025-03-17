from django.urls import path
from . import views

urlpatterns = [
    path('',views.GenerateWorkoutPlanView.as_view(),name='ai'),
    path('info/<int:id>',views.Info.as_view(),name='info'),
    path('fill',views.Fill.as_view(),name='fill'),
    path('delete/<int:id>',views.DeleteInfo.as_view(),name='delete')
]
