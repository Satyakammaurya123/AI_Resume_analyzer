const API_BASE_URL = "http://127.0.0.1:8000";

export async function uploadResume(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/resume/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to upload resume."
    );
  }

  return response.json();
}