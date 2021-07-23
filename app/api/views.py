from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status

from .serializer import BaseDatosSerializer
from .models import BaseDatos

from rest_framework.views import APIView
from rest_framework import viewsets

#vista basada en modelviewset---------------------
class modelviewset_based(viewsets.ModelViewSet):
    serializer_class = BaseDatosSerializer
    queryset = BaseDatos.objects.all()



#vistas utilizando viewsets---------------------
class Viewsets_based(viewsets.ViewSet):

    def list(self, request):
        personas = BaseDatos.objects.all()
        serializer = BaseDatosSerializer(personas, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = BaseDatosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        persona = BaseDatos.objects.get(cedula=pk)
        serializer = BaseDatosSerializer(persona)
        return Response(serializer.data)

    def update(self, request, pk=None):
        persona = BaseDatos.objects.get(pk=pk)
        serializer = BaseDatosSerializer(persona, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#ejercicio 1 clase APIView---------------------
class apiview_based(APIView):

    def get(self, request):
        personas = BaseDatos.objects.all()
        serializer = BaseDatosSerializer(personas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BaseDatosSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class apiview_based2(APIView):

    def get_object(self, id):
        try:
            return BaseDatos.objects.get(cedula=id)
        except BaseDatos.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        persona = self.get_object(id)
        serializer = BaseDatosSerializer(persona)
        return Response(serializer.data)

    def put(self, request, id):
        persona = self.get_object(id)
        serializer = BaseDatosSerializer(persona, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        persona = self.get_object(id)
        persona.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
