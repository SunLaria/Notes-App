from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    text = models.CharField(max_length=255)
    color = models.CharField(max_length=10)
    height = models.CharField(max_length=255)
    width = models.CharField(max_length=255)
    font_size = models.CharField(max_length=3)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def to_dict(self,i):
        return {'id':i,'text':self.text,'color':self.color,'width':self.width,'height':self.height,'font_size':self.font_size,'updated':self.updated.strftime("%d-%m-%Y"),'created':self.created.strftime("%d-%m-%Y")}
