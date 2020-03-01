from rest_framework import serializers, response, decorators, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django_filters import rest_framework as filters
from django.contrib.auth.models import User

from .models import Profile, WebToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'is_superuser')
        write_only = ('password')
        read_only = ('is_superuser')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        Profile.objects.create(user=user)

        return user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )

    @decorators.action(detail=False,  methods=['get'])
    def is_authenticated(self, request):
        data = {
            'status': True,
            'type': 'default'
        }
        return response.Response(data)

    @decorators.action(detail=False,  methods=['get'], permission_classes=[AllowAny])
    def exist_fb_token(self, request):
        fb_id = request.GET.get('fb_id', None)
        user_exist = Profile.objects.filter(facebook_id=fb_id).exists()

        return response.Response({'exists': user_exist})

    # def get(self, request):
    #     print(request.user)
    #     # serializer = self.serializer_class(request.user)
    #     # return response.Response(serializer.data)
    #     return response.Response('heh')

    # def post(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #     return response.Response(serializer.data)


class CustomObtainAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = WebToken.objects.get_or_create(user=user)
        return response.Response({'token': token.key})
