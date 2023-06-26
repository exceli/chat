from django.urls import path

from .views import RoomsAPIView, MessagesAPIView

# from .views import ChatsView, RoomView


urlpatterns = [
    path('', RoomsAPIView.as_view(), name='chat'),
    path('<str:name>/', MessagesAPIView.as_view(), name='room'),
    # path('', ChatsView.as_view(), name='chat'),
    # path('<str:room_name>/', RoomView.as_view(), name='room'),
]
