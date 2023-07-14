import traceback

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpRequest


class InvalidSchema(Exception):
    """JSON schema does not contains all fields"""
    status = 400


class ExceptionHandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request: HttpRequest, exception):
        match exception:
            case ObjectDoesNotExist() | InvalidSchema():
                message = {"message": exception.__doc__}
            case e if issubclass(type(e), Exception):
                message = {"message": repr(e)}
            case otherwise:
                message = {"message": "Unknown error happened", "data_type": repr(type(otherwise))}

        if settings.DEBUG and issubclass(type(exception), Exception):
            message['traceback'] = traceback.format_tb(exception.__traceback__)
        message['status'] = getattr(exception, 'status', 500)
        return JsonResponse(message, status=getattr(exception, 'status', 500))
