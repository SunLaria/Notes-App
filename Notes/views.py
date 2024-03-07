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
    response = render(request,'Notes/home.html')
    response.set_cookie(key='user-authenticated', value="true",path="/")
    response.delete_cookie('message',"/login")
    response.delete_cookie('message',"/register")
    return response

@ensure_csrf_cookie
def userlogin(request):
    if request.method == 'POST':
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user:
            login(request, user)
            response = redirect("/")
            response.delete_cookie('message',"/register")
            return response
        else:
            response = redirect("/login")
            response.set_cookie(key='message',value='Error Logging In',path="/login")
            return response
    if request.method == "GET":
        response = render(request,'Notes/login.html')
        return response


@login_required(login_url='/login/')
def userlogout(request):
    if request.method=="GET":
        logout(request)
        response = redirect('/login')
        response.delete_cookie('user-authenticated', '/')
        response.delete_cookie('message',"/login")
        return response

def register(request):
    if request.method=="GET":
        return render(request, 'Notes/register.html')
    if request.method=="POST":
        try:
            if request.POST['username'] != "" and request.POST['password'] != "":
                if len(User.objects.filter(username=request.POST['username'])) == 0:
                    user = User.objects.create_user(username=request.POST['username'],password=request.POST['password'])
                    user.save()
                    response = redirect('/login')
                    response.set_cookie(key='message',value='User Created Succesfully',path="/login")
                    return response
                else:
                    response = redirect('/register')
                    response.set_cookie(key='message',value='Username Already Exists',path="/register")
                    return response
            else:
                response = redirect('/register')
                response.set_cookie(key='message',value='Empty Fields',path="/register")
                return response

        except:
            response = redirect('/register')
            response.set_cookie(key='message',value='User Creation Failed',path="/register")
            return response



    
# id,text,color
@login_required(login_url='/login/')
def update_note(request):
    if request.method=='POST':
        try:
            data = json.loads(request.body)
            Note.objects.filter(id=data['body'].get('id')).update(**data["body"])
            return JsonResponse(data={'result':'Note Updated'})
        except: 
            return JsonResponse(data={'result':'Note Update Failed'})
    else:
        return redirect('home')


@login_required(login_url='/login/')
def get_notes(request):
    if request.method=='GET':
        try:
            return JsonResponse(data={'result':"Success","user_notes":json.dumps([i.to_dict(i.id) for i in request.user.note_set.all()])})
        except: 
            return JsonResponse(data={'result':'Note Update Failed'})
    else:
        return redirect('home')


# id
@login_required(login_url='/login/')
def delete_note(request):
    if request.method=='POST':
        try:
            data = json.loads(request.body)
            Note.objects.get(id=data['body'].get('id')).delete()
            return JsonResponse(data={'result':'Note Deleted'})
        except: 
            return JsonResponse(data={'result':'Note Delete Failed'})
    else:
        return redirect('home')


@login_required(login_url='/login/')
def add_note(request):
    if request.method=='POST':
        try:
            request.user.note_set.create(text="",color="#FFFFFF",width='250px',height='233px',font_size="14")
            return JsonResponse(data={'id':request.user.note_set.last().id,'result':'Note Created'})
        except: 
            return JsonResponse(data={'result':'Note Create Failed'})
    else:
        return redirect('home')
    