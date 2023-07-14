from django.db import models
from django.db.models import QuerySet
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpRequest

from .domain.template_upload import Placeholder


class Info(models.Model):
    name = models.CharField(max_length=64)
    occupation = models.CharField(max_length=64)
    date_occupation = models.DateTimeField(auto_now=True)
    department = models.CharField()
    other_info = models.JSONField()


class Manager(models.Model):
    info = models.OneToOneField(Info, on_delete=models.CASCADE)


class WorkerManager(models.Manager):
    def get_info_about_worker(self, id: int) -> Info | None:
        match self.filter(id=id).first():
            case None:
                raise ObjectDoesNotExist()
            case data:
                template_data = TemplateSerializer(data).data
                return JsonResponse(template_data)

    def get_workers_by_params(self, query: QuerySet) -> QuerySet['Worker']:
        params = ['name', 'department', 'occupation']
        workers = self.all()
        for i in params:
            if i in query:
                workers = workers.filter(info__name=query[i])

        return workers

    def delete_worker(self, worker_id) -> None:
        match self.filter(id=worker_id).first():
            case None:
                pass
            case info:
                info.delete()

    def update_worker(self, worker_id, name=None, department=None, occupation=None) -> None:
        match self.filter(id=worker_id).first():
            case None:
                pass
            case worker:
                if name:
                    worker.info.name = name
                if department and worker.info.department != department:
                    worker.info.department = department
                    worker.manager = Manager.objects.filter(info__department=department).first()
                if occupation:
                    worker.info.occupation = occupation
                worker.info.save()


class Worker(models.Model):
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE)
    info = models.OneToOneField(Info, on_delete=models.CASCADE)

    objects = WorkerManager()


class TemplateManager(models.Manager):
    def get_template_by_id(self, id: int) -> 'Template':
        return self.filter(id=id).first()

    def get_all_templates(self) -> QuerySet['Template']:
        return self.all()

    def add_template(self, name: str, bytes: bytes, type: str) -> 'Template':
        return self.create(bytes=bytes, name=name, type=type)

    def delete_template(self, template_id: int) -> None:
        template = self.get(id=template_id)
        template.delete()


class Template(models.Model):
    TYPE_CHOICES = models.TextChoices('TYPE', ['xlsx', 'docx'])

    bytes = models.BinaryField()
    name = models.CharField()
    type = models.CharField(choices=TYPE_CHOICES.choices, max_length=4)

    objects = TemplateManager()


class Descriptor(models.Model):
    template = models.ForeignKey(Template, on_delete=models.CASCADE)
    position = models.CharField(max_length=64, default=None, null=True)
    column = models.CharField(max_length=64)
    key = models.CharField(max_length=64, default=None, null=True)

    @classmethod
    def from_placeholder(cls, p: Placeholder, template: int) -> 'Descriptor':
        return Descriptor(position=p.position, column=p.column, key=p.key, template_id=template)

    def __str__(self):
        if self.key is not None:
            return f"_{self.key}"
        else:
            return f"{self.column}"


class InfoSerializer(ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'


class ManagerSerializer(ModelSerializer):
    info = InfoSerializer()

    class Meta:
        model = Manager
        fields = '__all__'


class InfoWorkerManagerSerializer(ModelSerializer):
    class Meta:
        model = Info
        fields = ['name']


class WorkerManagerSerializer(ModelSerializer):
    info = InfoWorkerManagerSerializer()

    class Meta:
        model = Manager
        fields = '__all__'


class WorkerSerializer(ModelSerializer):
    info = InfoSerializer()
    manager = WorkerManagerSerializer()

    class Meta:
        model = Worker
        fields = '__all__'


class DescriptorSerializer(ModelSerializer):
    class Meta:
        model = Descriptor
        fields = '__all__'


class TemplateSerializer(ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'name', 'type']
