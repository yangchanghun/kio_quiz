from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(
        max_length=20,
        unique=True,
        verbose_name="전화번호",
    )

    name = models.CharField(
        max_length=50,
        verbose_name="이름",
    )

    company = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="기업명",
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return f"{self.phone} ({self.name})"
