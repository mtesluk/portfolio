from rest_framework import serializers
from django.contrib.auth.models import User

from .profile import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    # password = serializers.CharField(default='')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'profile')
        read_only_fields = ('is_superuser', )

    # def create(self, validated_data):
    #     profile_data = validated_data.pop('profile')
    #     password = validated_data.pop('password')
    #     user = super().create(validated_data)
    #     profile = user.profile
    #     user.set_password(password)
    #     user.save()
    #     profile.location = profile_data.get('location', '')
    #     profile.facebook_name = profile_data.get('facebook_name', '')
    #     profile.facebook_id = profile_data.get('facebook_id', '')
    #     profile.save()
    #     return user
