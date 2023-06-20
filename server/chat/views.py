from django.shortcuts import render
from django.views import View

from .models import Room


class ChatsView(View):
    def get(self, request):
        rooms = Room.objects.all()
        return render(request, 'index.html', {
            'rooms': rooms
        })


class RoomView(View):
    def get(self, request, room_name):
        chat_room, created = Room.objects.get_or_create(name=room_name)
        return render(request, 'room.html', {
            'room': chat_room
        })
