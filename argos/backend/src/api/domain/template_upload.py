import abc
import os.path
import string
from abc import ABC
from dataclasses import dataclass
from itertools import repeat
from typing import IO, Iterable, Tuple

import re
import docxtpl
import openpyxl


@dataclass
class Placeholder:
    key: str | None
    position: str | None
    column: str = "other_info"


class Template(ABC):
    """
    Grammar:

    > placeholder ::= '{{'[' ']<identifier>[' ']'}}'

    > identifier ::= <column> | '_'<key>

    > column ::= <string>

    > key ::= <string>

    This class used to parse files to retrieve placeholders.
    Column is a name of column in info table of the database.
    Notation ``#key`` used to retrieve value from json in `other_info` column in info table
    """

    @abc.abstractmethod
    def variables(self) -> Iterable[Tuple[str | None, str]]:
        pass

    @staticmethod
    def parse_variable(variable: str, position: str | None = None) -> Placeholder:
        """
        Parses a string along with grammar of [Template] into placeholder structure
        :param variable: nonempty string value to parse
        :param position: position of placeholder in document
        :return: parsed placeholder
        """

        assert variable is not None and not ""
        if variable.startswith('_'):
            return Placeholder(variable.strip('_ '), position)
        return Placeholder(None, position, variable)

    def extract_placeholders(self) -> list[Placeholder]:
        return [Template.parse_variable(variable, pos) for pos, variable in self.variables()]

    @abc.abstractmethod
    def replace_placeholders(self, filename: str, **kwargs):
        pass


class DocxTemplate(Template):
    def variables(self) -> Iterable[Tuple[str | None, str]]:
        return zip(repeat(None), self.__document.get_undeclared_template_variables())

    def replace_placeholders(self, filename: str, **kwargs):
        self.__document.render(context=kwargs)
        self.__document.save(filename)

    def __init__(self, template_file: IO[bytes] | str):
        """
        :param template_file: valid path or file like structure
        """

        if isinstance(template_file, str) and not os.path.exists(template_file):
            raise FileNotFoundError(f"Expected .docx file was not found at path {template_file}")

        self.__document = docxtpl.DocxTemplate(template_file)


class XlsxTemplate(Template):
    """
    Placeholder fits in one cell
    """

    @staticmethod
    def _to_letters(num: int) -> str:
        def divmod_excel(num: int) -> Tuple[int, int]:
            a, b = divmod(num, 26)
            if b == 0:
                return a - 1, b + 26
            return a, b

        result = []
        while num > 0:
            num, d = divmod_excel(num)
            result.append(string.ascii_uppercase[d - 1])
        return ''.join(reversed(result))

    @staticmethod
    def __cells(worksheet) -> Iterable[Tuple[str, str | None]]:
        for i, row in enumerate(worksheet.values, start=1):
            for j, cell in enumerate(row, start=1):
                yield f"{worksheet.title}:{XlsxTemplate._to_letters(j)}{i}", cell

    def replace_placeholders(self, filename: str, **kwargs):
        for (table, cell), value in kwargs:
            self.__document[table][cell] = value

        self.__document.save(filename)

    def variables(self) -> Iterable[Tuple[str | None, str]]:
        for worksheet in self.__document.worksheets:
            for j, cell in self.__cells(worksheet):
                if cell is None:
                    continue

                match = re.match(r".*\{\{\s*(#?[\w_-]+)\s*}}.*", cell)
                if match is not None:
                    yield j, match.group(1)

    def __init__(self, template_file: str) -> None:
        if not os.path.exists(template_file):
            raise FileNotFoundError(f"Expected .xlsx file was not found at path {template_file}")

        self.__document: openpyxl.Workbook = openpyxl.load_workbook(template_file)
