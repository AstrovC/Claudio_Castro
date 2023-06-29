from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('nosotros/', nosotros, name='nosotros'),
    path('galeria/', galeria, name='galeria'),
    path('noticias/', noticias_api, name='noticias'),
    path('contacto/', contacto, name='contacto'),
    path('registro/', registro, name='registro'),
    path('lista_noticias/', lista_noticias, name='lista_noticias'),
    path('crear/', agregar_noticia, name='crear_noticia'),
    path('modificar/<id>', modificar_noticia, name='modificar_noticia'),
    path('eliminar/<id>', eliminar_noticia, name='eliminar_noticia'),

]