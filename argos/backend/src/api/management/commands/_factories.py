import factory
from factory.django import DjangoModelFactory
from api.models import Worker, Template, Info, Manager, Descriptor
from django.contrib.auth.hashers import make_password
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone


import random


def sequence(number):
   """
   :param number:
   :return: a dict that contains random data
   """
   return {
       'email': 'example{0}@foo.com'.format(number),
       'username': 'username{0}'.format(number),
   }


class InfoFactory(DjangoModelFactory):
    class Meta:
        model = Info
        strategy = factory.BUILD_STRATEGY

    name = factory.Faker('word')
    occupation = factory.Faker('word')
    date_occupation = factory.Faker("date_time", tzinfo=timezone.get_current_timezone())
    department = factory.Faker('word')
    other_info = factory.Sequence(sequence)



class ManagerFactory(DjangoModelFactory):
    class Meta:
        model = Manager
        strategy = factory.BUILD_STRATEGY

    info = factory.SubFactory(InfoFactory)


class WorkerFactory(DjangoModelFactory):
    class Meta:
        model = Worker
        strategy = factory.BUILD_STRATEGY

    manager = factory.SubFactory(ManagerFactory)
    info = factory.SubFactory(InfoFactory)



class TemplateFactory(DjangoModelFactory):
    class Meta:
        model = Template
        strategy = factory.BUILD_STRATEGY

    bytes = factory.Faker('binary')
    name = factory.Faker('word')
    type = factory.Faker('word')


class DescriptorFactory(DjangoModelFactory):
    class Meta:
        model = Descriptor
        strategy = factory.BUILD_STRATEGY

    template = factory.SubFactory(TemplateFactory)
    position = factory.LazyAttribute(lambda _: None)    
    column = factory.Faker('word')
    key = factory.Faker('word')  
