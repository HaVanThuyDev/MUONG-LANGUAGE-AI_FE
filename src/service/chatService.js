import API_BASE_URL from "../config/api";

export async function chatWithMuongAI(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: payload.user_id ?? 1,
        text: payload.text ?? "",
        region_hint: payload.region_hint ?? null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || "Chat API failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Cannot connect to server");
  }
}

export async function detectMuongWords(sentence) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sentence,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || "Detect API failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Cannot connect to server");
  }
}

export async function getDictionary() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dictionary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || "Dictionary API failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Cannot connect to server");
  }
}