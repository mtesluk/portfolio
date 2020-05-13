from rest_framework import serializers, response, decorators, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from django.db.utils import IntegrityError

from account.models import Profile, WebToken
from account.services.user import UserService
from account.services.token import TokenService


class UserViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny, )

    def list(self, request, *args, **kwargs):
        filters = {}
        filters_ids = request.GET.get('ids', None)
        ordering = request.GET.get('ordering', None)
        if filters_ids:
            filters_ids = filters_ids.split(',')
            filters['id'] = {'type': 'in', 'value': filters_ids}
        service = UserService()
        users = service.get_users(filters, None, ordering)
        return response.Response(users)

    @decorators.action(detail=False,  methods=['get'], permission_classes=[IsAuthenticated])
    def is_authenticated(self, request):
        return response.Response({'is_auth': True})

    @decorators.action(detail=False,  methods=['get'])
    def exist_fb_account(self, request):
        fb_id = request.GET.get('fb_id', None)
        service = UserService()
        exists = service.fb_account_exists(fb_id=fb_id)

        return response.Response({'exists': exists})

    @decorators.action(detail=False,  methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        user = request.user
        service = UserService()
        data = service.get_user(user.id)
        return response.Response(data)

    def create(self, request):
        service = UserService()
        try:
            data = service.create_user(request.data)
        except IntegrityError:
            return response.Response({'message': 'User with provided data already exists'}, 500)
        return response.Response(data, 201)


class CustomObtainAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        service = UserService()
        token = service.sign_in(user)
        return response.Response({'token': token})
