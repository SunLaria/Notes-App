from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/',views.userlogin,name='login'),
    path('logout/',views.userlogout,name="logout"),
    path('register/',views.register, name="register"),
    path('add-Note/',views.add_note,name="add-Note"),
    path('delete-Note/',views.delete_note,name="delete-Note"),
    path('update-Note/',views.update_note,name="update-Note"),
    path('get-Notes/',views.get_notes,name="get-Notes")
]

