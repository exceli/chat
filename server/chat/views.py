from django.shortcuts import render
from django.views import View
from rest_framework import generics, permissions

from .models import Room, Message
from .serializers import RoomSerializers, MessageSerializers


class RoomsAPIView(generics.ListAPIView):
    """Представление для получения списка комнат чата"""

    queryset = Room.objects.all()
    serializer_class = RoomSerializers
    # permission_classes = permissions.IsAuthenticated


class MessagesAPIView(generics.ListAPIView):
    """Представление получения истрии сообщений чата"""

    serializer_class = MessageSerializers
    # permission_classes = permissions.IsAuthenticated

    def get_queryset(self):
        room_name = self.kwargs.get('name')
        queryset = Message.objects.all()

        if room_name:
            queryset = queryset.filter(room__name=room_name)

        return queryset


# class RoomsView(View):
#     """Представление для получения списка комнат чата"""
#
#     def get(self, request):
#         rooms = Room.objects.all()
#         return render(request, 'index.html', {
#             'rooms': rooms
#         })
#
#
# class MessagesView(View):
#     """Представление получения истрии сообщений чата"""
#
#     def get(self, request, room_name):
#         chat_room, created = Room.objects.get_or_create(name=room_name)
#         return render(request, 'room.html', {
#             'room': chat_room
#         })