from django.shortcuts import render
from random import randint

# Create your views here.


def home(request, room_name):
    number = randint(12344,8348554)

    context = {
        'room_name': number,
    }
    return render(request, 'index.html', context=context)