from django.db import models



class BaseDatos(models.Model):

    Masculino = 'M'
    Femenino = 'F'
    sex_choices = [
        (Masculino, 'Masculino'),
        (Femenino, 'Femenino')
    ]


    nombre = models.CharField(max_length=100)
    sexo = models.CharField(choices=sex_choices,
                            max_length=9,
                            default=Masculino, blank=True)
    cedula = models.IntegerField(unique=True, blank=True, primary_key=True)
    email = models.EmailField(max_length=250, blank=True)
    comentario = models.TextField(blank=True)


    def __str__(self):
        return str(self.nombre)
