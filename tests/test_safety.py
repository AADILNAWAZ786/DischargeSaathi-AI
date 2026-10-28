from app.main import normalize_quote, quote_is_in_source, validate_ai_payload


def test_normalize_quote_ignores_case_and_whitespace():
    assert normalize_quote("Take   one\n tablet") == "Take one tablet"


def test_quote_check_accepts_matching_source_excerpt():
    source = "Follow-up: Contact the clinic in seven days."
    assert quote_is_in_source("Contact the clinic in seven days.", source)


def test_quote_check_rejects_invented_excerpt():
    source = "Follow-up: Contact the clinic."
    assert not quote_is_in_source("Take an extra medicine every morning.", source)
    assert not quote_is_in_source("contact the clinic.", source)


def test_invalid_quoted_items_are_removed():
    source = "Follow-up: Contact the clinic in seven days."
    payload = {
        "patient_friendly_summary": [
            {"source_quote": "Contact the clinic in seven days.", "plain_language": "Call your clinic in seven days."},
            {"source_quote": "Take antibiotics for a week.", "plain_language": "Take an antibiotic."},
        ],
        "medication_instructions": [{"source_quote": "Take two tablets every day."}],
        "next_steps": [],
        "warning_signs": [],
        "unclear_or_missing": ["Medicine instructions are missing."],
        "questions_for_care_team": ["What should I do if I cannot reach the clinic?"],
        "short_disclaimer": "Draft only.",
    }
    cleaned, rejected = validate_ai_payload(payload, source)
    assert len(cleaned["patient_friendly_summary"]) == 1
    assert cleaned["medication_instructions"] == []
    assert len(rejected) == 2


def test_invalid_section_type_is_safely_removed():
    cleaned, rejected = validate_ai_payload(
        {"patient_friendly_summary": "not a list", "medication_instructions": [], "next_steps": [], "warning_signs": []},
        "Some sample source text.",
    )
    assert cleaned["patient_friendly_summary"] == []
    assert rejected
