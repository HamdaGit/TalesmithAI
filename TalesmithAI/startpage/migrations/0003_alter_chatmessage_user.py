# Generated by Django 5.0.6 on 2024-06-02 09:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startpage', '0002_chatmessage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='startpage.customuser'),
        ),
    ]
