# Generated by Django 4.0.3 on 2023-04-29 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emailid', models.CharField(max_length=100)),
                ('QSAR', models.JSONField()),
                ('DTI', models.JSONField()),
            ],
        ),
    ]
