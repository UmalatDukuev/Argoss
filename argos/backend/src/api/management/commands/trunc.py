from api.models import Worker, Template, Info, Manager, Descriptor

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.core import management


class Command(BaseCommand):
    help = 'Fill the database'

    @transaction.atomic
    def handle(self, *args, **options):
        models = [Worker, Template, Info, Manager, Descriptor]
        for m in models:
            m.objects.all().delete()