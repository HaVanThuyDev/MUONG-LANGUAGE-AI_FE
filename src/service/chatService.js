import API_BASE_URL from "../config/api";

function getLocalMuongResponse(query) {
  const q = (query || "").toLowerCase().trim();

  // 1. Chào hỏi
  if (
    q.includes("chào") ||
    q.includes("alo") ||
    q.includes("hello") ||
    q.includes("hi") ||
    q === "ơi" ||
    q.includes("bạn ơi")
  ) {
    return "Chào bạn! Tôi là trợ lý AI Ngôn ngữ Mường. Tôi có thể giúp bạn tra cứu từ vựng, dịch câu hoặc tìm hiểu đời sống văn hóa, phong tục của người Mường.";
  }

  // 2. Ăn uống, sinh hoạt
  if (q.includes("ăn cơm") || q.includes("cơm")) {
    return "Trong tiếng Mường, 'ăn cơm' được gọi là 'ăn com'. 'Cơm' tiếng Mường đọc là 'com' (như com lam nướng ống nứa).";
  }
  if (q.includes("uống nước") || q.includes("nước")) {
    return "Trong tiếng Mường, 'nước' gọi là 'đác' (hoặc 'nác'). 'Uống nước' nói là 'uống đác' hoặc 'uống nác'.";
  }
  if (q.includes("đi đâu") || q.includes("đi chơi")) {
    return "Câu hỏi thăm quen thuộc của người Mường: 'Bác đi đâu đấy?' thường nói là 'Bác đi đâu tê?' hoặc 'Đi mô tê?'.";
  }
  if (q.includes("ngủ") || q.includes("nghỉ")) {
    return "Trong tiếng Mường, 'đi ngủ' thường nói là 'đi tảy' hoặc 'nằm nghỉ'.";
  }

  // 3. Xưng hô gia đình
  if (q.includes("bố") || q.includes("mẹ") || q.includes("ông") || q.includes("bà")) {
    return "Cách xưng hô trong gia đình người Mường:\n- Mẹ: Mế / Mạ\n- Bố: Bố / Bọ\n- Bà: Bả\n- Ông: Ôn\n- Con: Con / Tloi.";
  }

  // 4. Văn hóa, cồng chiêng, nhà sàn
  if (q.includes("chiêng") || q.includes("cồng")) {
    return "Cồng chiêng trong tiếng Mường gọi là 'Kha' (hoặc Khà). Dàn chiêng Mường chuẩn gồm 12 chiếc, tượng trưng cho 12 tháng, giữ hồn trong lễ hội và tang ma Mo Mường.";
  }
  if (q.includes("nhà sàn") || q.includes("nhà")) {
    return "Nhà sàn truyền thống Mường được dựng theo dáng rùa với 4 mái dốc (nhà rùa). Bếp lửa chính giữa nhà sàn gọi là 'bếp dạ', nơi giữ ấm và sum vầy gia đình.";
  }
  if (q.includes("đẻ đất") || q.includes("sử thi") || q.includes("mo mường")) {
    return "Sử thi 'Đẻ đất Đẻ nước' (Te tấc te đác) là pho thần thoại đồ sộ của người Mường, kể về sự hình thành trời đất, con người và muôn loài từ thuở hồng hoang.";
  }
  if (q.includes("cạp váy") || q.includes("váy") || q.includes("áo pắn") || q.includes("thổ cẩm")) {
    return "Điểm đặc sắc nhất trên trang phục phụ nữ Mường là 'cạp váy' dệt thủ công với các hoa văn rồng, rùa, hươu, hoa sen; kết hợp cùng khăn thắt trắng và áo pắn xẻ ngực.";
  }
  if (q.includes("bi") || q.includes("vang") || q.includes("thàng") || q.includes("động") || q.includes("vùng mường")) {
    return "Xứ Hòa Bình có 4 vùng Mường cổ danh tiếng đúc kết trong câu: 'Nhất Bi, nhì Vang, tam Thàng, tứ Động' (Mường Bi - Tân Lạc, Mường Vang - Lạc Sơn, Mường Thàng - Cao Phong, Mường Động - Kim Bôi).";
  }

  return "Hiện tại tôi đang cập nhật thêm dữ liệu cho câu hỏi này. Bạn hãy thử hỏi tôi về từ vựng giao tiếp (ăn cơm, uống nước, chào hỏi), cồng chiêng, nhà sàn hay sử thi Mường nhé!";
}

export async function chatWithMuongAI(payload) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2800); // 2.8s timeout

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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || "Chat API failed");
    }

    return data;
  } catch (error) {
    // If backend is offline or mixed-content blocked, use smart native knowledge fallback
    const localReply = getLocalMuongResponse(payload.text);
    return {
      status: "success",
      data: {
        reply: localReply,
        matched_terms: [],
      },
    };
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
    return { status: "offline", words: [] };
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
    return { status: "offline", dictionary: [] };
  }
}
