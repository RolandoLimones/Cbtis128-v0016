from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    
    # Nosotros
    path('transparencia/', views.transparencia, name="transparencia"),
    path('avisos-privacidad/', views.avisos_privacidad, name="avisos_privacidad"),
    path('contacto/', views.contacto, name="contacto"),
    path('revista_digital/',views.revista_digital, name="revista_digital"),
    
    # Alumnos
    path('grupos-culturales/', views.grupos_culturales, name="grupos-culturales"),
    path('grupos-deportivos/', views.grupos_deportivos, name="grupos-deportivos"),
    
    # Trámites
    path('credencial-escolar/', views.credencial_escolar, name="credencial_escolar"),
    path('justificante-falta/', views.justificante_falta, name="justificante_falta"),
    path('constancia/', views.constancia, name="constancia"),
    path('titulacion/', views.titulacion, name="titulacion"),
    path('servicio-social/', views.servicio_social, name="servicio_social"),
    path('recursamiento/', views.recursamiento, name="recursamiento"),
    
    # Oferta Académica
    path('oferta-academica/', views.oferta_academica, name="oferta_academica"),

    
    # Otros
    path('departamentos/', views.departamentos, name="departamentos"),
    path('ubicacion/', views.ubicacion, name="ubicacion"),
]