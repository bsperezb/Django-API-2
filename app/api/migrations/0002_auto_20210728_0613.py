# Generated by Django 3.2.5 on 2021-07-28 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='basedatos',
            name='cedula',
            field=models.IntegerField(blank=True, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='basedatos',
            name='email',
            field=models.EmailField(blank=True, max_length=250),
        ),
    ]