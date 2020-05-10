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


class WebToken(models.Model):
    key = models.TextField(_("Key"), max_length=240)
    user = models.OneToOneField(
        User, related_name='auth_token',
        on_delete=models.CASCADE, verbose_name=_("User")
    )
    created = models.DateTimeField(_("Created"), auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(237)).decode()

    def __str__(self):
        return self.key


@receiver(post_save, sender=User)
def create_auth_token_and_profile(sender, instance=None, created=False, **kwargs):
    if created:
        WebToken.objects.create(user=instance)
        Profile.objects.create(user=instance)
