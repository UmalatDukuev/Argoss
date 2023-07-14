from api.models import Worker, Template, Info, Manager, Descriptor
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from api.management.commands._factories import *

import random


class Command(BaseCommand):
    help = 'Fill the database'

    def add_arguments(self, parser):
        parser.add_argument('ratio', nargs='?', type=int, default=100)

    @transaction.atomic
    def handle(self, *args, **options):
        models = [Worker, Template, Info, Manager, Descriptor]

        ratio = options['ratio']

        info_for_managers = Info.objects.bulk_create(InfoFactory() for _ in range(ratio))

        managers = []
        for i in range(ratio):
            manager = ManagerFactory.create(info = info_for_managers[i])
            managers.append(manager)
        
        info_for_workers = Info.objects.bulk_create(InfoFactory() for _ in range(ratio))

        workers = []
        for i in range(ratio):
            worker = WorkerFactory.create(manager = managers[i], info = info_for_workers[i])
            workers.append(worker)

        templates = []
        types = ['xlsx', 'docx']
        for i in range(ratio):
            template = TemplateFactory.create(type = random.choice(types))
            templates.append(template)


        descriptors = []
        for i in range(int(ratio / 2)):
            descriptor = DescriptorFactory.create(template = templates[i], column = "other_info")
            descriptors.append(descriptor)
        
        column_variants = ["name", "occupation", "date_occupation", "department"]
        for i in range(int(ratio / 2)):
            descriptor = DescriptorFactory.create(template = templates[int(i + ratio / 2)], column = random.choice(column_variants), key = None)
            descriptors.append(descriptor)