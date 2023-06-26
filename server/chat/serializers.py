from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Room, Message


class UserSerializer(serializers.ModelSerializer):
    """Сериализация пользователей"""
    class Meta:
        model = User
        fields = ('id', 'username')


class RoomSerializers(serializers.ModelSerializer):
    """Сериализация списка чатов"""
    class Meta:
        model = Room
        fields = ("id", "name", "online",)


class MessageSerializers(serializers.ModelSerializer):
    """Сериализация чата"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ("id", "user", "room", "content",)