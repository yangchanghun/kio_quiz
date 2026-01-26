from django.contrib import admin
from .models import User  # 네 커스텀 유저 모델

admin.site.register(User)