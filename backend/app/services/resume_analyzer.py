import re


KNOWN_SKILLS = [
    "Python",
    "SQL",
    "Java",
    "JavaScript",
    "TypeScript",
    "React",
    "FastAPI",
    "Node.js",
    "AWS",
    "Azure",
    "GCP",
    "BigQuery",
    "Cloud Storage",
    "Cloud Run",
    "Cloud Composer",
    "Databricks",
    "Spark",
    "PySpark",
    "Airflow",
    "Kafka",
    "Docker",
    "Git",
    "GitHub",
    "PostgreSQL",
    "MySQL",
    "Oracle",
    "MongoDB",
    "ETL",
    "REST API",
]


def extract_skills(text: str) -> list[str]:
    found_skills = []

    for skill in KNOWN_SKILLS:
        pattern = rf"\b{re.escape(skill)}\b"

        if re.search(pattern, text, re.IGNORECASE):
            found_skills.append(skill)

    return found_skills


def extract_section(text: str, section_names: list[str]) -> str:
    lines = text.splitlines()

    start_index = None

    for index, line in enumerate(lines):
        cleaned_line = line.strip().lower()

        if cleaned_line in [name.lower() for name in section_names]:
            start_index = index + 1
            break

    if start_index is None:
        return ""

    section_lines = []

    section_headers = [
        "skills",
        "technical skills",
        "experience",
        "work experience",
        "professional experience",
        "education",
        "academic background",
        "projects",
        "certifications",
    ]

    for line in lines[start_index:]:
        cleaned_line = line.strip().lower()

        if cleaned_line in section_headers:
            break

        if line.strip():
            section_lines.append(line.strip())

    return "\n".join(section_lines)


def calculate_resume_score(
    text: str,
    skills: list[str],
    experience: str,
    education: str,
) -> int:
    score = 0

    # Skills - 25 points
    if skills:
        score += min(len(skills) * 2, 25)

    # Experience - 30 points
    if experience:
        experience_length = len(experience.strip())

        if experience_length >= 1000:
            score += 30
        elif experience_length >= 500:
            score += 25
        elif experience_length >= 200:
            score += 20
        else:
            score += 10

    # Education - 20 points
    if education:
        score += 20

    # Resume completeness / text length - 15 points
    text_length = len(text.strip())

    if text_length >= 3000:
        score += 15
    elif text_length >= 2000:
        score += 12
    elif text_length >= 1000:
        score += 8
    elif text_length >= 500:
        score += 5

    # Projects - 10 points
    if "project" in text.lower() or "projects" in text.lower():
        score += 10

    return min(score, 100)


def analyze_resume(text: str) -> dict:
    skills = extract_skills(text)

    experience = extract_section(
        text,
        [
            "experience",
            "work experience",
            "professional experience",
        ],
    )

    education = extract_section(
        text,
        [
            "education",
            "academic background",
        ],
    )

    score = calculate_resume_score(
        text=text,
        skills=skills,
        experience=experience,
        education=education,
    )

    return {
        "score": score,
        "skills": skills,
        "experience": experience,
        "education": education,
    }