import os
import binascii
from rest_framework.authtoken.models import Token
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=30, blank=True)
    facebook_name = models.CharField(max_length=60, blank=True)
    facebook_id = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_auth_token_and_profile(sender, instance=None, created=False, **kwargs):
    if created:
        Profile.objects.create(user=instance)
