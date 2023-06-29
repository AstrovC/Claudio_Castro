from django import forms
from .models import Noticia
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class NoticiaForm(forms.ModelForm):
    class Meta:
        model = Noticia
        fields = ['id_noticia', 'autor', 'titulo', 'contenido', 'imagen', 'categoria', 'fecha_publicacion']

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    phone = forms.CharField(required=False)
    gender = forms.ChoiceField(choices=[('M', 'Masculino'), ('F', 'Femenino')])

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password1", "password2"]

    def clean(self):
        cleaned_data = super().clean()
        first_name = cleaned_data.get("first_name")
        last_name = cleaned_data.get("last_name")

        if first_name and len(first_name.strip()) < 3 or len(first_name.strip()) > 15:
            self.add_error("first_name", "El primer nombre debe tener entre 3 y 15 caracteres sin espacios en blanco.")

        if last_name and len(last_name.strip()) < 3 or len(last_name.strip()) > 15:
            self.add_error("last_name", "El apellido debe tener entre 3 y 15 caracteres sin espacios en blanco.")
