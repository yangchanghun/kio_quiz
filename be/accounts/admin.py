from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User


# 🔐 유저 생성 폼 (관리자용)
class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="비밀번호", widget=forms.PasswordInput)
    password2 = forms.CharField(label="비밀번호 확인", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ("phone", "name", "company")

    def clean_password2(self):
        p1 = self.cleaned_data.get("password1")
        p2 = self.cleaned_data.get("password2")
        if p1 and p2 and p1 != p2:
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")
        return p2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


# 🔐 유저 수정 폼 (비밀번호 해시 유지)
class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(label="비밀번호")

    class Meta:
        model = User
        fields = (
            "phone",
            "name",
            "company",
            "password",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        )


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ("id", "phone", "name", "company", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")

    fieldsets = (
        (None, {"fields": ("phone", "password")}),
        ("개인 정보", {"fields": ("name", "company")}),
        ("권한", {"fields": ("is_staff", "is_superuser", "groups", "user_permissions")}),
        ("상태", {"fields": ("is_active",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("phone", "name", "company", "password1", "password2"),
        }),
    )

    search_fields = ("phone", "name")
    ordering = ("-created_at",)
