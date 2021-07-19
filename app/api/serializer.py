from rest_framework import serializers
from .models import BaseDatos

class BaseDatosSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseDatos
        fields = '__all__'
