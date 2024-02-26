from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import User
from .models import Note
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
import json

@login_required(login_url='/login/')
def home(request):
    return render(request,'Notes/home.html',{"user_notes":json.dumps([i.to_dict() for i in request.user.note_set.all()])})

@ensure_csrf_cookie
def userlogin(request):
    if request.method == 'POST':
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user:
            login(request, user)
            return redirect("/")
        else:
            return redirect('/login',message="Login Failed")
            # message not working
    if request.method == "GET":
        return render(request,'Notes/login.html')


@login_required(login_url='/login/')
def userlogout(request):
    if request.method=="GET":
        logout(request)
        return redirect('login')
    

# axios.post(,{'content-type': 'application/json})
    

# text,color
@login_required(login_url='/login/')
def add_note(request):
    if request.method=='POST':
        try:
            data = json.loads(request.body)
            request.user.note_set.create(text=data.get('text'),color=data.get('text'))
            return JsonResponse(data={'id':request.user.note_set.last().id,'result':'Note Created'})
        except: 
            return JsonResponse(data='Note Create Failed')
    else:
        return redirect('home')
    
# id
@login_required(login_url='/login/')
def delete_note(request):
    if request.method=='POST':
        try:
            data = json.loads(request.body)
            Note.objects.get(id=data.get('id')).delete()
            return JsonResponse(data='Note Deleted')
        except: 
            return JsonResponse(data='Note Delete Failed')
    else:
        return redirect('home')

# id,text,color
@login_required(login_url='/login/')
def update_note(request):
    if request.method=='POST':
        try:
            data = json.loads(request.body)
            note = Note.objects.get(id=data.get('id'))
            note.text = data.get('text')
            note.color = data.get('color')
            note.save()
            return JsonResponse(data='Note Updated')
        except: 
            return JsonResponse(data='Note Update Failed')
    else:
        return redirect('home')


@login_required(login_url='/login/')
def get_notes(request):
    if request.method=='get':
        try:
            return JsonResponse(data={'result':"Success","user_notes":json.dumps([i.to_dict() for i in request.user.note_set.all()])})
        except: 
            return JsonResponse(data='Note Update Failed')
    else:
        return redirect('home')
