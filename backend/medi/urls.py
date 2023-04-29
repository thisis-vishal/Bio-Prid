from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('', views.home),
    path('about',views.about),
    path('wel', views.ReactView.as_view(), name="something"),
    path('wel2', views.ReactView2.as_view(), name="something"),
    path('del', views.DTIModel.as_view(), name="something"),
    path('del2', views.DTICSV.as_view(), name="something"),
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('user', views.UserView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('check',views.some_name),
    path('test',views.up),
    path('prt',views.rt)
]
