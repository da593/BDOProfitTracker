from django.shortcuts import render
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.http import JsonResponse
from datetime import datetime
from .models import *

# Create your views here.


def getHomePage(request):
    return render(request,'index.html')

def getPearlMarketPage(request):
    return render(request,'pearlmarket.html')


def getCookingPage(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        queryset = CookingItem.objects.values('item_name','base_price','in_stock','profession_level','quantity','grade')
        serializer = json.dumps(list(queryset),cls=DjangoJSONEncoder)
        data = json.loads(serializer)
        return JsonResponse({"lastUpdate":datetime.now().timestamp(),'data':data})
    else:
        queryset = CookingItem.objects.values('item_name','base_price','in_stock','profession_level','quantity','grade')
        serializer = json.dumps(list(queryset),cls=DjangoJSONEncoder)
        data = json.loads(serializer)
        return render(request,'cooking.html',{'data':data})

def getAlchemyPage(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        queryset = AlchemyItem.objects.values('item_name','base_price','in_stock','profession_level','quantity','grade')
        serializer = json.dumps(list(queryset),cls=DjangoJSONEncoder)
        data = json.loads(serializer)
        return JsonResponse({'data':data})
    else:
        queryset = AlchemyItem.objects.values('item_name','base_price','in_stock','profession_level','quantity','grade')
        serializer = json.dumps(list(queryset),cls=DjangoJSONEncoder)
        data = json.loads(serializer)
        return render(request,'alchemy.html',{'data':data})

def getFarmingPage(request):
    crop = FarmingItem.objects.values('item_name','base_price','in_stock','grade','perfect_growth_minutes','fertilizer_growth_minutes','slots','seed_price','fruit')
    serializer = json.dumps(list(crop),cls=DjangoJSONEncoder)
    crops = json.loads(serializer)

    fruit = FruitItem.objects.values('item_name','base_price')
    serializer = json.dumps(list(fruit),cls=DjangoJSONEncoder)
    fruits = json.loads(serializer)

    fodder = FruitItem.objects.filter(item_type="farming").values("item_name","base_price")
    serializer = json.dumps(list(fodder),cls=DjangoJSONEncoder)
    fodders = json.loads(serializer)
    return render(request,'farming.html',{'crop':crops,'fruit':fruits,"stonetail":fodders})

