from rest_framework import serializers, response, decorators, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django_filters import rest_framework as filters
from django.contrib.auth.models import User

from .models import Profile, WebToken


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('location', 'facebook_name', 'facebook_id')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    password = serializers.CharField(default='')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'password', 'profile')
        write_only = ('password')
        read_only = ('is_superuser')

    def create(self, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = super().create(validated_data)
        profile = user.profile
        user.set_password(password)
        user.save()
        profile.location = profile_data.get('location', '')
        profile.facebook_name = profile_data.get('facebook_name', '')
        profile.facebook_id = profile_data.get('facebook_id', '')
        profile.save()
        return user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    # @decorators.action(detail=False,  methods=['get'])
    # def is_authenticated(self, request):
    #     data = {
    #         'status': True,
    #         'type': 'default'
    #     }
    #     return response.Response(data)

    @decorators.action(detail=False,  methods=['get'], permission_classes=[AllowAny])
    def exist_fb_account(self, request):
        fb_id = request.GET.get('fb_id', None)
        user_exist = Profile.objects.filter(facebook_id=fb_id).exists()

        return response.Response({'exists': user_exist})

    @decorators.action(detail=False,  methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.serializer_class(request.user)
        return response.Response(serializer.data)

    # @decorators.permission_classes([AllowAny])
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class CustomObtainAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = WebToken.objects.get_or_create(user=user)
        return response.Response({'token': token.key})
