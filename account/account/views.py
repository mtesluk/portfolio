from rest_framework import serializers, response, decorators, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from django.db.utils import IntegrityError

from account.models import Profile
from account.services.user import UserService
from account.services.token import TokenService
from account.serializers.jwt import CustomTokenObtainPairSerializer, TokenObtainPairView


class UserViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny, )

    def list(self, request, *args, **kwargs):
        """
        Endpoint to get list of users

        Description comming soon
        """
        filters = {}
        filters_ids = request.GET.get('ids', None)
        ordering = request.GET.get('ordering', None)
        if filters_ids:
            filters_ids = filters_ids.split(',')
            filters['id'] = {'type': 'in', 'value': filters_ids}
        service = UserService()
        users = service.get_users(filters, None, ordering)
        return response.Response(users)

    @decorators.action(detail=False,  methods=['get'])
    def exist_fb_account(self, request):
        """
        Endpoint to check if given fb token exists in database

        Description comming soon
        """
        fb_id = request.GET.get('fb_id', None)
        service = UserService()
        exists = service.fb_account_exists(fb_id=fb_id)

        return response.Response({'exists': exists})

    @decorators.action(detail=False,  methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Endpoint to retrieve data of user authenticated

        Description comming soon
        """
        user = request.user
        service = UserService()
        data = service.get_user(user.id)
        return response.Response(data)

    def create(self, request):
        """
        Endpoint to create user

        Description comming soon
        """
        service = UserService()
        try:
            data = service.create_user(request.data)
        except IntegrityError:
            return response.Response({'message': 'User with provided data already exists'}, 500)
        return response.Response(data, 201)

    def update(self, request, *args, **kwargs):
        """
        Endpoint to update self user data

        Does not wotk yet
        """
        user = request.user
        data = request.data
        service = UserService()
        data = service.update_user(user.id, data)
        return response.Response(data)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
