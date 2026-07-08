# Flowers Go Bridge Website

Website trung gian chuyên nghiệp giúp điều hướng thông minh khi quét mã QR để mở ứng dụng Android **Flowers Go**.

## 🌟 Tính năng
- **Tự động nhận diện thiết bị**: Nhận diện chính xác hệ điều hành (Android, iOS, hoặc Desktop).
- **Mở ứng dụng tự động (Android)**: Cố gắng mở ứng dụng bằng Deep Link `flowersgo://login`.
- **Hệ thống chuyển hướng dự phòng (Fallback)**: Nếu ứng dụng chưa cài đặt trên Android, giao diện tải APK sẽ tự động hiển thị sau `1500ms`.
- **Hỗ trợ iOS**: Hiển thị thông báo thân thiện chỉ ra rằng ứng dụng hiện tại chỉ dành cho Android kèm nút liên hệ nhà phát triển.
- **Hỗ trợ Máy tính (Desktop)**: Hiển thị mã QR động được tạo tự động từ URL hiện tại để người dùng có thể quét trực tiếp bằng điện thoại.
- **Thiết kế cao cấp (Premium UX)**: Sử dụng các hiệu ứng Gradient chuyển động mượt mà, thiết kế Glassmorphism hiện đại, tối ưu hiển thị trên mọi kích thước màn hình di động và máy tính.

---

## 📁 Cấu trúc thư mục
```text
flowers-go-bridge/
├── index.html   # Giao diện chính và cấu trúc HTML5
├── style.css    # Hệ thống thiết kế CSS (Responsive, Gradient, Glassmorphism)
├── script.js    # Logic nhận diện thiết bị, điều hướng Deep Link & tạo QR Code
└── logo.png     # Logo ứng dụng Flowers Go (được tạo độc quyền)
```

---

## ⚙️ Hướng dẫn cấu hình (Thay đổi Link)

Để thay thế các liên kết của bạn, hãy mở file `script.js` và cập nhật các hằng số cấu hình ở trên đầu file:

```javascript
// --- CONFIGURATION ---
const DEEP_LINK_URL = 'flowersgo://login'; // Deep link mở ứng dụng
const APK_DOWNLOAD_URL = 'https://your-domain.com/flowersgo.apk'; // Link tải file APK thật của bạn
const DEV_CONTACT_URL = 'https://m.me/flowersgo'; // Link Messenger/Telegram hỗ trợ khách hàng
const REDIRECT_TIMEOUT = 1500; // Thời gian chờ trước khi hiện nút tải (ms)
const TRANSITION_DELAY = 800; // Thời gian hiển thị hiệu ứng "Đang kiểm tra thiết bị..." (ms)
```

---

## 🚀 Hướng dẫn deploy lên Vercel

Dự án này sử dụng HTML/CSS/JS thuần, không sử dụng framework hay backend nên việc triển khai lên Vercel cực kỳ đơn giản và hoàn toàn miễn phí:

### Cách 1: Sử dụng Vercel Dashboard (Không cần code)
1. Truy cập [Vercel](https://vercel.com) và đăng nhập tài khoản của bạn.
2. Truy cập trang dự án và chọn **Add New...** -> **Project**.
3. Kết nối với kho lưu trữ GitHub chứa thư mục này hoặc kéo thả trực tiếp thư mục `flowers-go-bridge` vào mục upload của Vercel.
4. Nhấn **Deploy** là xong!

### Cách 2: Triển khai qua Vercel CLI
1. Cài đặt Vercel CLI (nếu chưa có):
   ```bash
   npm install -g vercel
   ```
2. Di chuyển vào thư mục dự án:
   ```bash
   cd flowers-go-bridge
   ```
3. Đăng nhập và triển khai:
   ```bash
   vercel
   ```
4. Chọn các cài đặt mặc định và nhận link deploy chính thức của bạn.
