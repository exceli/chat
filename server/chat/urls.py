from django.urls import path

from .views import ChatsView, RoomView

urlpatterns = [
    path('', ChatsView.as_view(), name='chat'),
    path('<str:room_name>/', RoomView.as_view(), name='room'),
]
