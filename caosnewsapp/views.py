from django.shortcuts import get_object_or_404, redirect, render
from .models import Noticia
from django.contrib.auth.decorators import login_required
from .forms import NoticiaForm, CustomUserCreationForm
from django.contrib.auth import logout, login, authenticate

# Create your views here.
def index(request):
    return render(request, 'index.html')

def nosotros(request):
    return render(request, 'nosotros.html')

def galeria(request):
    return render(request, 'galeria.html')

def noticias_api(request):
    return render(request, 'noticias-api.html')

def contacto(request):
    return render(request, 'contacto.html')


def registro(request):
    datos = {
        'form': CustomUserCreationForm()
    }

    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            login(request, user)
            return redirect(to="index")
        else:
            datos['form'] = formulario
    
    return render (request, 'registration/registro.html', datos)


#CRUD
@login_required(login_url="login")
def lista_noticias(request):
    noticias = Noticia.objects.all().order_by('id_noticia')
    datos = {
        'noticias' : noticias
    }
    return render(request, 'admin/lista-noticias.html', datos)

@login_required(login_url="login")
def agregar_noticia(request):
    datos = {
        'form': NoticiaForm
    }
    if request.method=='POST':
        noticias_form = NoticiaForm(data=request.POST, files=request.FILES)
        if noticias_form.is_valid():
            noticias_form.save()
            return redirect(to="lista_noticias")
        else:
            datos['form'] = noticias_form
    
    return render(request, 'admin/crear-noticia.html', datos)

@login_required(login_url="login")
def modificar_noticia(request, id):
    noticias = get_object_or_404(Noticia, id_noticia=id)
    datos = {
        'form': NoticiaForm(instance = noticias)
    }
    if request.method=='POST':
        formulario = NoticiaForm(data=request.POST, instance=noticias, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            return redirect(to="lista_noticias")
        datos["form"] = formulario
              
    return render(request, 'admin/modificar-noticia.html', datos)

@login_required(login_url="login")
def eliminar_noticia(request, id):
    noticias = get_object_or_404(Noticia, id_noticia=id)
    noticias.delete()
    return redirect(to="lista_noticias") 

