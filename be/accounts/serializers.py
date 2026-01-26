from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token

class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("phone", "name", "company", "password1", "password2")

    def validate(self, data):
        # ✅ 비밀번호 일치 체크
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")

        # ✅ 길이 체크 (4자리 이상)
        if len(data["password1"]) < 4:
            raise serializers.ValidationError("비밀번호는 4자리 이상이어야 합니다.")

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


# class LoginSerializer(serializers.Serializer):
#     phone = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, data):
#         user = authenticate(
#             phone=data["phone"],
#             password=data["password"],
#         )

#         if not user:
#             raise serializers.ValidationError("전화번호 또는 비밀번호가 틀렸습니다.")

#         # refresh = RefreshToken.for_user(user)
#         token, created = Token.objects.get_or_create(user=user)
#         return {
#             "token": token.key,
#             "user": {
#                 "id": user.id,
#                 "phone": user.phone,
#                 "name": user.name,
#                 "company": user.company,
#             },
#         }

class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = User.objects.get(phone=data["phone"])
        except User.DoesNotExist:
            raise serializers.ValidationError("전화번호 또는 비밀번호가 틀렸습니다.")

        if not user.check_password(data["password"]):
            raise serializers.ValidationError("전화번호 또는 비밀번호가 틀렸습니다.")

        token, _ = Token.objects.get_or_create(user=user)

        return {
            "token": token.key,
            "user": {
                "id": user.id,
                "phone": user.phone,
                "name": user.name,
                "company": user.company,
            },
        }
