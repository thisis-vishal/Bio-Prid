from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('wel', views.ReactView.as_view(), name="something"),
    path('wel2', views.ReactView2.as_view(), name="something"),
    path('del', views.DTIModel.as_view(), name="something"),
    path('del2', views.DTICSV.as_view(), name="something"),
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('user', views.UserView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('history',views.History.as_view()),
    path('particularhistory',views.ParicularHistory.as_view()),
    path('delhistory',views.DeleteHistory.as_view()),
]
