from django.shortcuts import render


#----------------------- RUTAS / REDIRECCIONES NAVBAR -----------------------------
def index(request):
    return render(request, 'index.html')

# Nosotros

def transparencia(request):
    return render(request, 'pages/nosotros/transparencia.html')

def avisos_privacidad(request):
    return render(request, 'pages/nosotros/avisos_privacidad.html')

def contacto(request):
    return render(request, 'pages/nosotros/contacto.html')

def revista_digital(request):
    return render(request, 'pages/nosotros/revista_digital.html')

# Alumnos
def grupos_culturales(request):
    return render(request, 'pages/alumnos/grupos-culturales.html')

def grupos_deportivos(request):
    return render(request, 'pages/alumnos/grupos-deportivos.html')

# Trámites  
def credencial_escolar(request):
    return render(request, 'pages/tramites/credencial_escolar.html')

def justificante_falta(request):
    return render(request, 'pages/tramites/justificante_falta.html')

def constancia(request):
    return render(request, 'pages/tramites/constancia.html')

def titulacion(request):
    return render(request, 'pages/tramites/titulacion.html')

def servicio_social(request):
    return render(request, 'pages/tramites/servicio_social.html')

def recursamiento(request):
    return render(request, 'pages/tramites/recursamiento.html')

# Oferta Académica
def oferta_academica(request):
    return render(request, 'pages/oferta_academica.html')

# Otros
def departamentos(request):
    return render(request, 'pages/departamentos.html')

def ubicacion(request):
    return render(request, 'pages/ubicacion.html')
#----------------------- FIN RUTAS / REDIRECCIONES NAV BAR- ----------------------------