# Tư duy Estimate trong Mobile Development
## Cách một Senior Engineer phân tích và dự đoán effort của một feature

Estimate là một trong những kỹ năng khó nhất trong mobile development. Lập trình viên ít kinh nghiệm thường nhìn nhận estimation là **"thời gian để viết xong code"**. Ngược lại, một Senior Engineer xem đây là quá trình phân tích toàn diện hệ thống, nhận diện rủi ro và dự phóng vận hành trên production.

> **Ví dụ thực tế:**
> Khi nhận yêu cầu *"Implement Google Login"*, Junior thường nghĩ đến việc tạo nút, gọi SDK Google và gửi token lên server. 
> 
> Trong khi đó, Senior sẽ phân tích: OAuth flow hoạt động ra sao? Lưu trữ token ở đâu bảo mật? Cơ chế silent refresh token hết hạn? Cấu hình platform (SHA1 Android, URL Schemes/Associated Domains iOS)? Trải nghiệm khi mạng yếu (timeout)? Tracking events và khôi phục session khi restart app?
> 
> Đó là sự khác biệt giữa **"viết code chạy được"** và **"bàn giao tính năng sẵn sàng cho sản xuất (production-ready)"**.

---

## 1. Estimate không chỉ là thời gian code

Coding thường chỉ chiếm một phần nhỏ trong tổng nỗ lực thực thi. Một tính năng hoàn chỉnh đòi hỏi:

*   **Phân tích & Làm rõ yêu cầu:** Phát hiện các điểm mâu thuẫn trong spec business của Product Manager.
*   **Thiết lập môi trường & Tích hợp:** Cấu hình endpoints, certs, SDKs và khớp API contract với Backend.
*   **Xử lý ngoại lệ (Edge Cases):** Lập trình đối phó với các kịch bản lỗi hệ thống, mất mạng.
*   **Kiểm thử (Testing):** Thực hiện manual test, viết unit/UI test và xử lý feedback từ phía QA.
*   **Vận hành sau phát hành (Post-release):** Theo dõi logs, crash reports và khắc phục conflict mã nguồn khi gộp code.

Do đó, estimate của Senior luôn bao gồm cả **implementation cost** (chi phí phát triển) lẫn **operational cost** (chi phí vận hành).

---

## 2. Tư duy phân lớp khi estimate

Để tránh bỏ sót đầu việc, Senior chia nhỏ tính năng thành các lớp cụ thể:

1.  **UI/UX:** Giao diện động, các trạng thái hiển thị và hiệu ứng chuyển cảnh.
2.  **State Management:** Vòng đời dữ liệu, luồng truyền tải và giải phóng bộ nhớ.
3.  **Business Logic:** Quy tắc nghiệp vụ cốt lõi cần lập trình.
4.  **API & Networking:** Cấu trúc payload, tối ưu request và xử lý lỗi truyền tải.
5.  **Storage & Cache:** Lưu trữ offline (SQLite/Keychain/Prefs) và đồng bộ dữ liệu ngầm.
6.  **Security & Auth:** Vòng đời token, mã hóa dữ liệu nhạy cảm và SSL Pinning.
7.  **Platform-Specific:** Khác biệt về quyền (permissions) và lifecycle giữa iOS và Android.
8.  **Navigation:** Điều hướng, stack màn hình và xử lý Deeplink.
9.  **Analytics & Monitor:** Đo lường hành vi người dùng và hệ thống cảnh báo lỗi crash.
10. **Testing & DevOps:** Unit/UI test, Feature flags và quy trình rollback khẩn cấp.

---

## 3. UI không chỉ là màn hình

Độ phức tạp của giao diện được phản ánh qua các **trạng thái tương tác (states)** thay vì số lượng component tĩnh trên Figma. Ví dụ, một màn hình danh sách đơn giản cần xử lý:

*   **Loading & Empty states:** Trạng thái tải dữ liệu (spinner/skeleton) và màn hình trống.
*   **Error & Retry states:** Báo lỗi kết nối kèm nút "Thử lại" giúp reload nhanh.
*   **Pagination (Load more) & Pull-to-refresh:** Tự động phân trang khi cuộn và kéo để làm mới danh sách.
*   **Skeleton & Offline behaviors:** Trải nghiệm xem trước (skeleton) và xử lý cache khi không có mạng.
*   **Keyboard & Debounce interactions:** Tương tác với bàn phím hệ thống và trì hoãn gửi request khi tìm kiếm.

> **Quy tắc vàng:**
> *"Số lượng trạng thái UI tỷ lệ thuận với số lượng bug và thời gian xử lý thực tế."*

---

## 4. API Integration luôn phức tạp hơn tưởng tượng

Ở môi trường local, API integration chỉ đơn thuần là *Gọi request -> Parse JSON -> Hiển thị*. Ở production, đó là cuộc chiến với sự bất ổn đường truyền:

*   **Timeout & Retry strategy:** Tự động thử lại thông qua cơ chế *Exponential Backoff* kèm *Jitter*.
*   **Rate limit & Token expiry:** Đối phó lỗi HTTP 429 và silent refresh token tự động dưới background.
*   **Race conditions & Cache sync:** Giải quyết xung đột khi gửi nhiều request song song và đồng bộ hóa cache.
*   **Pagination sync:** Tránh hiển thị trùng lặp sản phẩm (duplicate items) khi dữ liệu phía server biến động liên tục trong lúc cuộn trang.

---

## 5. Quản lý trạng thái (State Management)

Hệ thống càng phình to, quản lý luồng dữ liệu càng phức tạp:
*   **Shared state:** Đồng bộ dữ liệu giỏ hàng hoặc profile tức thì trên nhiều màn hình.
*   **Optimistic updates:** Cập nhật UI trước khi server phản hồi (ví dụ: nút Like) và tự động hoàn tác (rollback) nếu API gặp lỗi.
*   **State Lifecycle:** Kiểm soát việc khởi tạo và giải phóng (dispose) trạng thái đúng lúc để tránh rò rỉ bộ nhớ (memory leak).

---

## 6. Khác biệt nền tảng (Platform-Specific)

Tính năng chạy tốt trên Android chưa chắc chạy ổn định trên iOS do đặc tính OS:

| Tính năng | Phức tạp đặc thù trên Android | Phức tạp đặc thù trên iOS |
| :--- | :--- | :--- |
| **Social Login** | SHA1 key, Play Services compatibility | URL Schemes, Apple Sign-In compliance |
| **Storage & Files** | Scoped storage, File Provider permissions | Sandbox file access, iCloud sync |
| **Background Tasks** | Battery optimization, WorkManager | Background Fetch, Suspended lifecycle |

---

## 7. Edge Cases định hình con số estimate

Phần lớn bug nghiêm trọng xảy ra ở luồng biên (edge cases). Lấy ví dụ tính năng **Upload Avatar**:
*   *Happy Path:* Chọn ảnh -> Upload.
*   *Edge Cases:* Người dùng từ chối quyền camera; ảnh chọn quá nặng (cần nén hình); rớt mạng nửa chừng (cần resume); ảnh bị xoay ngược do metadata EXIF lỗi; hoặc người dùng spam click nút upload liên tục.

> **Triết lý Senior:**
> *"Nỗ lực tối ưu trải nghiệm và xử lý triệt để các edge cases luôn gấp 3-4 lần việc viết mã happy path."*

---

## 8. Authentication & Security

Auth là domain nhạy cảm liên quan sâu tới bảo mật thông tin và session của người dùng:
*   **Secure storage:** Lưu trữ encrypted token an toàn vào Keystore (Android) / Keychain (iOS).
*   **Session recovery:** Khôi phục phiên làm việc tự động khi tắt hẳn ứng dụng rồi mở lại.
*   **Logout cleanup & Revocation:** Dọn dẹp sạch sẽ cache khi đăng xuất và tự động chuyển hướng khi token bị server thu hồi.

---

## 9. Production Concerns và Testing

Trước khi phát hành rộng rãi tới hàng nghìn người dùng, Senior luôn chuẩn bị:
*   **Analytics & Crashlytics:** Tracking hành vi người dùng và giám sát lỗi crash thời gian thực.
*   **Feature Flags:** Cho phép bật/tắt tính năng từ xa mà không cần phát hành lại bản cập nhật app.
*   **Quy trình kiểm thử:** Viết Unit Test cho logic nghiệp vụ cốt lõi và Regression Test để đảm bảo không phá vỡ tính năng cũ đang hoạt động ổn định.

---

## 10. Unknown & Buffer thời gian khoa học

Không có estimate nào chính xác tuyệt đối. Senior sử dụng **Buffer** không phải để trì hoãn công việc, mà để phản ánh độ rủi ro khách quan của công nghệ và hệ thống:

*   **UI đơn giản:** Cộng thêm **20%** effort để tinh chỉnh mượt mà.
*   **Tích hợp SDK bên thứ ba:** Cộng thêm **50%** đề phòng SDK lỗi hoặc thiếu tài liệu.
*   **Xử lý Payment hoặc Auth:** Cộng thêm **70%** do tính chất nhạy cảm và kịch bản test khắt khe.
*   **Refactor mã nguồn cũ (Legacy):** Cộng thêm từ **100% đến 150%** vì rủi ro ảnh hưởng chéo cực lớn.

> **Kết luận:**
> Senior Engineer không ước lượng *"Mất bao lâu để viết xong code"*, họ ước lượng *"Cần bao nhiêu nguồn lực để tính năng hoạt động ổn định, an toàn và dễ bảo trì lâu dài trên production"*. Đó là lý do bản estimate của họ luôn thực tế, đáng tin cậy và ít rủi ro trễ hạn.