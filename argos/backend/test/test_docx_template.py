import pytest

from src.api.domain.template_upload import DocxTemplate, Placeholder


def test_docx_init_with_non_existent_docx():
    with pytest.raises(FileNotFoundError):
        DocxTemplate("abobabeba")


def test_docx_parsing_1():
    test_template = DocxTemplate("Заявление на отчисление.docx")
    placeholders = list(test_template.extract_placeholders())

    expected = [Placeholder(key='faculty_full_name', position=None, column='other_info'),
                Placeholder(key='faculty_name', position=None, column='other_info'),
                Placeholder(key='date', position=None, column='other_info'),
                Placeholder(key='phone_number', position=None, column='other_info'),
                Placeholder(key='group_name', position=None, column='other_info'),
                Placeholder(key='grade_number', position=None, column='other_info'),
                Placeholder(key='specialty_name', position=None, column='other_info'),
                Placeholder(key='signature_name', position=None, column='other_info'),
                Placeholder(key='recipient_signature_name', position=None, column='other_info'),
                Placeholder(key='recipiency_date', position=None, column='other_info'),
                Placeholder(key='semester_number', position=None, column='other_info'),
                Placeholder(key='full_name_parental', position=None, column='other_info')]

    assert len(placeholders) == len(expected)
    for actual in placeholders:
        assert actual in expected


def test_docx_parsing_2():
    test_template = DocxTemplate("Анкета для вузов Росатом.docx")
    placeholders = list(test_template.extract_placeholders())

    expected = [Placeholder(key='email', position=None, column='other_info'),
                Placeholder(key='alma_mater', position=None, column='other_info'),
                Placeholder(key='department_name', position=None, column='other_info'),
                Placeholder(key='date_of_birth', position=None, column='other_info'),
                Placeholder(key='average_grade', position=None, column='other_info'),
                Placeholder(key='citizenship', position=None, column='other_info'),
                Placeholder(key='first_name', position=None, column='other_info'),
                Placeholder(key='date', position=None, column='other_info'),
                Placeholder(key='job_title', position=None, column='other_info'),
                Placeholder(key='company_name', position=None, column='other_info'),
                Placeholder(key='degree', position=None, column='other_info'),
                Placeholder(key='third_name', position=None, column='other_info'),
                Placeholder(key='home_address', position=None, column='other_info'),
                Placeholder(key='speciality', position=None, column='other_info'),
                Placeholder(key='phone_number', position=None, column='other_info'),
                Placeholder(key='grade', position=None, column='other_info'),
                Placeholder(key='faculty', position=None, column='other_info'),
                Placeholder(key='signature_name', position=None, column='other_info'),
                Placeholder(key='second_name', position=None, column='other_info')]

    assert len(placeholders) == len(expected)
    for actual in placeholders:
        assert actual in expected
