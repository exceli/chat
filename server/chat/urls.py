from django.urls import path

from .views import RoomsAPIView, MessagesAPIView

# from .views import RoomsView, MessagesView


urlpatterns = [
    path('', RoomsAPIView.as_view(), name='chat'),
    path('<str:name>/', MessagesAPIView.as_view(), name='room'),
    # path('', RoomsView.as_view(), name='chat'),
    # path('<str:room_name>/', MessagesView.as_view(), name='room'),
]