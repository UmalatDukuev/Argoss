import base64
import io
import tempfile
import uuid
from typing import Tuple, Type, TypeVar

import django.http
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpRequest, FileResponse
from rest_framework.views import APIView

from .exception_handler import InvalidSchema
from .models import *
from .domain.template_upload import Template as DTemplate, DocxTemplate, XlsxTemplate


def paginate(query: QuerySet, page: int, per_page: int) -> Tuple[QuerySet, int]:
    count = query.count()
    offset = page * per_page
    return query[offset:offset + per_page], count


def success(**kwargs) -> JsonResponse:
    return JsonResponse({'message': 'Ok', **kwargs})


class WorkerIdView(APIView):
    def get(self, request: HttpRequest, id: int) -> JsonResponse:
        match Worker.objects.filter(id=id).first():
            case None:
                raise ObjectDoesNotExist()
            case data:
                template_data = WorkerSerializer(data).data
                return JsonResponse(template_data)

    def put(self, request: HttpRequest, id: int):
        Worker.objects.update_worker(id, **request.data)
        return success()

    def delete(self, request, id):
        Worker.objects.delete_worker(id)
        return success()


class DepartmentView(APIView):
    def get(self, request: HttpRequest):
        unique_departments = Info.objects.values_list('department', flat=True).distinct()
        unique_departments = list(unique_departments)
        return JsonResponse({'departments' : unique_departments})


class WorkerView(APIView):
    def get(self, request: HttpRequest):
        query: HttpRequest.GET = request.query_params
        total = None

        workers = Worker.objects.get_workers_by_params(query)

        if 'page' in query and 'page_limit' in query:
            workers, total = paginate(workers, int(query['page']) - 1, int(query['page_limit']))

        json = WorkerSerializer(workers, many=True).data
        response = JsonResponse({'workers': json})

        response['Total-Count-Workers'] = total

        return response

    def post(self, request: HttpRequest) -> JsonResponse:
        info = Info(**request.data)
        manager = Manager.objects.filter(info__department=request.data['department']).first()
        worker = Worker(manager=manager, info=info)
        info.save()
        worker.save()
        return JsonResponse({'id': InfoSerializer(info).data['id']})


def _populate_into_docx(contents: bytes) -> DTemplate:
    from .domain.template_upload import DocxTemplate
    file = tempfile.NamedTemporaryFile('w+b', delete=False)
    file.write(contents)
    file.close()
    return DocxTemplate(file.name)


def _populate_into_xlsx(contents: bytes) -> DTemplate:
    from .domain.template_upload import XlsxTemplate
    file = tempfile.NamedTemporaryFile('w+b', delete=False)
    file.write(contents)
    file.close()
    return XlsxTemplate(file.name)


def _resolve_descriptor(d: Descriptor, worker: Worker) -> any:
    match d.column, d.key:
        case "other_info", key:
            return worker.info.other_info[key.strip('_ ')]
        case column, None:
            return getattr(worker.info, column)
    raise Exception(f"Wrong descriptor: {d}")


def _descriptor_into_key(d: Descriptor) -> str:
    if d.column is None:
        return f"_{d.key}"
    return d.column


class TemplateView(APIView):
    def get(self, request) -> JsonResponse:
        templates = Template.objects.get_all_templates()
        return JsonResponse({'items': TemplateSerializer(templates, many=True).data})

    def post(self, request) -> JsonResponse:
        body: dict[str] = request.data
        if not {'name', 'bytes', 'type'}.issubset(body.keys()):
            raise InvalidSchema()

        file_bytes = base64.decodebytes(body['bytes'].encode('ascii'))
        template = Template.objects.add_template(name=body['name'], bytes=file_bytes, type=body['type'])

        match body['type']:
            case 'docx':
                tplt = _populate_into_docx(file_bytes)
            case 'xlsx':
                tplt = _populate_into_xlsx(file_bytes)
            case otherwise:
                raise InvalidSchema()

        Descriptor.objects.bulk_create(Descriptor.from_placeholder(p, template.id) for p in tplt.extract_placeholders())

        return success(id=template.id)


class TemplateIdView(APIView):
    def get(self, request, id: int):
        from .domain.template_download import use_template

        query: django.http.QueryDict = request.query_params

        if not query:
            match Template.objects.get_template_by_id(id):
                case None:
                    raise ObjectDoesNotExist()
                case raw_template:
                    return JsonResponse({'template': TemplateSerializer(raw_template).data})

        if {'source'}.issubset(query.keys()) and query['source']:
            return use_template(id)

        if not {'worker_id'}.issubset(query.keys()):
            raise InvalidSchema()

        return use_template(id, worker_id=int(query['worker_id']))
