from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
from django.shortcuts import render



# class ConsumeView(View):
    # # page = 'base.html'

    # def get(self, request):
        # return render(request, 'base.html')

def ConsumeView(request):
    return render(request, "base.html")
