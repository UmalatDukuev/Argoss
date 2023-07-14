import io

import pytest

from src.api.domain.template_upload import XlsxTemplate, Placeholder, DocxTemplate, Template


@pytest.mark.parametrize('input_str, key, column', [
    ('_key', 'key', 'other_info'),
    ('name', None, 'name')
])
def test_parse_variable(input_str, key, column):
    parse_result = Template.parse_variable(input_str, None)
    expected = Placeholder(key, None, column)
    assert parse_result == expected


def test_xlsx_init_with_non_existent_docx():
    with pytest.raises(FileNotFoundError):
        XlsxTemplate("abobabeba")


@pytest.mark.parametrize('input_num, expected', [
    (1, 'A'),
    (12, 'L'),
    (27, 'AA'),
    (703, 'AAA'),
    (702, 'ZZ')
])
def test_number_to_letters(input_num: int, expected: str):
    assert XlsxTemplate._to_letters(input_num) == expected


def test_xlsx_parsing_variables():
    test_template = XlsxTemplate("Простейший шаблон.xlsx")
    variables = list(test_template.variables())
    assert variables == [('Лист1:D6', 'name')]


def test_xlsx_parsing_placeholders():
    test_template = XlsxTemplate("Простейший шаблон.xlsx")
    placeholders = list(test_template.extract_placeholders())
    assert placeholders == [Placeholder(None, 'Лист1:D6', 'name')]


def test_xlsx_parsing():
    test_template = XlsxTemplate("Заявление на социальную стипендию.xlsx")
    placeholders = list(test_template.extract_placeholders())

    expected = [Placeholder(key='document_number', position='Лист1:A2', column='other_info'),
                Placeholder(key='second_name', position='Лист1:I4', column='other_info'),
                Placeholder(key='first_name', position='Лист1:I5', column='other_info'),
                Placeholder(key='third_name', position='Лист1:I6', column='other_info'),
                Placeholder(key='department_name', position='Лист1:I7', column='other_info'),
                Placeholder(key='home_number', position='Лист1:D33', column='other_info'),
                Placeholder(key='room_number', position='Лист1:G33', column='other_info'),
                Placeholder(key='phone_number', position='Лист1:E34', column='other_info'),
                Placeholder(key='full_name', position='Лист1:A39', column='other_info'),
                Placeholder(key='grade_number', position='Лист1:A40', column='other_info'),
                Placeholder(key='faculty_name', position='Лист1:A41', column='other_info'),
                Placeholder(key='dean_signature_name', position='Лист1:G41', column='other_info'),
                Placeholder(key='social_scholarship_start_date', position='Лист1:F44', column='other_info'),
                Placeholder(key='social_scholarship_receiver_signature_name', position='Лист1:A45',
                            column='other_info'),
                Placeholder(key='social_scholarship_end_date', position='Лист1:F45', column='other_info')]

    assert len(placeholders) == len(expected)
    for actual in placeholders:
        assert actual in expected


def test_create_from_bytes():
    with open('Анкета для вузов Росатом.docx', 'rb') as f:
        file_bytes = f.read()
        tmplt = DocxTemplate(io.BytesIO(file_bytes))
        assert len(tmplt.extract_placeholders()) != 0
