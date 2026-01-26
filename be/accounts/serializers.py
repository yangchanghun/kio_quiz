from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("phone", "name", "company", "password1", "password2")

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password1")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user
    
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(
            phone=data["phone"],
            password=data["password"],
        )

        if not user:
            raise serializers.ValidationError("전화번호 또는 비밀번호가 틀렸습니다.")

        refresh = RefreshToken.for_user(user)

        return {
            "token": str(refresh.access_token),
            "user": {
                "id": user.id,
                "phone": user.phone,
                "name": user.name,
                "company": user.company,
            },
        }

