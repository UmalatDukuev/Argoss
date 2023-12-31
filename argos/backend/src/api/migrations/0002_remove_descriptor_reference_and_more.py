# Generated by Django 4.2.3 on 2023-07-12 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='descriptor',
            name='reference',
        ),
        migrations.RemoveField(
            model_name='descriptor',
            name='replace_with',
        ),
        migrations.AddField(
            model_name='descriptor',
            name='column',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='descriptor',
            name='key',
            field=models.CharField(default=None, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='descriptor',
            name='position',
            field=models.CharField(default=None, max_length=64, null=True),
        ),
    ]
