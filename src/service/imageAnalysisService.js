export async function analyzeMuongImage({ imageUri, imageName, prompt = '' }) {
  const lowerName = (imageName || imageUri || '').toLowerCase();
  const lowerPrompt = (prompt || '').toLowerCase();

  if (
    lowerName.includes('chieng') ||
    lowerName.includes('gong') ||
    lowerName.includes('trong') ||
    lowerPrompt.includes('chiêng') ||
    lowerPrompt.includes('cồng') ||
    lowerPrompt.includes('trống')
  ) {
    return 'Đây là dàn cồng chiêng Mường (tiếng Mường gọi là Kha). Chiêng là nhạc cụ thiêng liêng biểu trưng cho bản làng, thường dùng trong lễ hội Khai Hạ, mừng cơm mới và các điệu xéc bùa chúc phúc bình an.';
  }

  if (
    lowerName.includes('vay') ||
    lowerName.includes('ao') ||
    lowerName.includes('cap') ||
    lowerName.includes('tho cam') ||
    lowerPrompt.includes('váy') ||
    lowerPrompt.includes('áo') ||
    lowerPrompt.includes('cạp') ||
    lowerPrompt.includes('thổ cẩm')
  ) {
    return 'Đây là trang phục truyền thống của phụ nữ Mường với điểm nhấn đặc sắc là cạp váy dệt thổ cẩm tơ tằm. Bộ trang phục gồm khăn thắt trắng, áo pắn và váy đen dài chấm gót mang nét đẹp mộc mạc, khéo léo.';
  }

  if (
    lowerName.includes('nha') ||
    lowerName.includes('san') ||
    lowerPrompt.includes('nhà') ||
    lowerPrompt.includes('sàn')
  ) {
    return 'Đây là nhà sàn truyền thống của người Mường, được dựng theo dáng rùa với 4 mái dốc. Bếp lửa đặt giữa nhà là nơi giữ ấm và gắn kết các thế hệ trong gia đình.';
  }

  if (prompt && prompt.trim()) {
    return 'Tôi đã nhận diện được hình ảnh bạn gửi. ' + prompt.trim();
  }

  return 'Tôi đã nhận được hình ảnh của bạn liên quan đến văn hóa xứ Mường.';
}
