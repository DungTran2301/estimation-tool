# Tư duy Estimate trong Mobile Development
## Cách một Senior Engineer phân tích và dự đoán effort của một feature

Estimate là một trong những kỹ năng khó nhất trong software engineering, đặc biệt ở mobile development. Phần lớn developer ở giai đoạn đầu sự nghiệp thường nhìn estimation như việc **“đo thời gian để code xong một tính năng”**. 

Tuy nhiên, với những engineer có nhiều kinh nghiệm hơn, estimate không còn đơn thuần là việc đo lượng code cần viết. Nó là quá trình phân tích toàn bộ hệ thống, nhận diện complexity tiềm ẩn, đánh giá rủi ro, hiểu dependency và dự đoán những vấn đề có khả năng xảy ra khi feature được đưa vào môi trường production.

Đó cũng là lý do vì sao cùng một feature nhưng estimate của junior và senior có thể chênh lệch rất lớn.

> **Sự khác biệt thực tế:**
> Khi nhận một yêu cầu như *“Implement Google Login”*, một developer ít kinh nghiệm thường chỉ nghĩ đến việc tạo nút login, gọi SDK Google Sign-In và gửi token lên server. 
> 
> Trong khi đó, một senior engineer sẽ ngay lập tức mở rộng góc nhìn sang nhiều lớp khác nhau của hệ thống: *OAuth flow hoạt động như thế nào? Token sẽ được lưu ở đâu? Refresh token xử lý ra sao khi hết hạn? Deeplink có cần cấu hình hay không? Android cần SHA1 gì? iOS cần URL Scheme hay Associated Domain gì? Người dùng bấm login nhiều lần liên tục sẽ thế nào? Nếu mạng yếu hoặc request timeout thì UX sẽ ra sao? Analytics cần track event gì? Crash có cần report không? Session sẽ được restore như thế nào khi app restart? Và feature này có ảnh hưởng gì tới navigation flow hiện tại hay không?*
> 
> Đây là sự khác biệt cốt lõi giữa **“code feature”** và **“deliver production-ready feature”**.

---

## 1. Estimate không phải là đo thời gian code

Một hiểu nhầm phổ biến của developer là cho rằng estimate chỉ liên quan đến implementation. Trên thực tế, phần coding thường chỉ là một phần trong tổng effort của một feature.

Một feature hoàn chỉnh thường bao gồm rất nhiều hoạt động khác ngoài việc viết code:

*   **Phân tích requirement:** Đọc kỹ, đối chiếu tài liệu mô tả tính năng để nắm rõ mục tiêu business và phát hiện các mâu thuẫn nếu có.
*   **Đọc và hiểu business logic:** Xử lý và chuyển đổi các nghiệp vụ phức tạp từ phía khách hàng hoặc Product Manager (PM).
*   **Setup environment:** Cấu hình môi trường phát triển, API endpoints, SSL certificates, SDKs liên quan.
*   **Integration với Backend:** Thống nhất API contracts, phối hợp kiểm thử kết nối và đồng bộ hóa cấu trúc dữ liệu.
*   **Xử lý edge cases:** Phát hiện và lập trình giải quyết các trường hợp lỗi, ngoại lệ, gián đoạn kết nối.
*   **Testing:** Viết unit test, widget test, integration test và tự kiểm thử (manual test) trước khi bàn giao.
*   **Bug fixing & Review feedback:** Tiếp thu ý kiến đóng góp từ code review và khắc phục các lỗi phát sinh trong quá trình QA test.
*   **Resolve conflict:** Giải quyết các xung đột mã nguồn khi gộp (merge) code vào nhánh chung.
*   **Hỗ trợ QA:** Trợ giúp đội ngũ kiểm thử tái hiện lỗi hoặc giải thích cặn kẽ các luồng hoạt động phức tạp.
*   **Monitoring sau release:** Theo dõi sát sao mức độ ổn định của tính năng qua log, crash report trên production.

Senior engineer hiểu rằng phần lớn thời gian của software development không nằm ở việc **“viết dòng code đầu tiên”**, mà nằm ở việc đảm bảo feature hoạt động ổn định trong mọi tình huống thực tế. Vì vậy, estimate của senior thường bao gồm cả **implementation cost** lẫn **operational cost** của feature.

---

## 2. Tư duy phân lớp khi estimate

Một senior mobile developer thường không nhìn feature như một khối duy nhất. Họ chia feature thành nhiều layer khác nhau để phân tích độ phức tạp (complexity). 

Thông thường, khi nhận một task, họ sẽ quét qua các lớp góc nhìn sau:

1.  **UI Layer (Giao diện):** Các thành phần giao diện, layout responsive, hiệu ứng animation mượt mà.
2.  **State Management (Trạng thái):** Luồng dữ liệu màn hình, lưu trữ tạm thời, vòng đời dữ liệu.
3.  **Business Logic (Nghiệp vụ):** Quy tắc xử lý nghiệp vụ cốt lõi của tính năng.
4.  **API & Networking (Kết nối mạng):** Cấu trúc request/response, tối ưu hóa payload, xử lý lỗi truyền tải.
5.  **Storage (Lưu trữ cục bộ):** SQLite, Room, CoreData, Key-Value stores, cơ chế cache dữ liệu ngầm.
6.  **Authentication & Security (Bảo mật):** Phân quyền truy cập, mã hóa nhạy cảm, lưu trữ keychain/keystore bảo mật.
7.  **Platform-specific behavior (Đặc thù nền tảng):** Khác biệt về quyền (permissions) và lifecycle giữa Android và iOS.
8.  **Navigation (Điều hướng):** Luồng di chuyển giữa các màn hình, xử lý Deeplinks, quản lý navigation stack.
9.  **Error Handling (Xử lý lỗi):** Trải nghiệm người dùng thân thiện khi xảy ra sự cố mạng hoặc lỗi hệ thống.
10. **Analytics & Monitoring (Đo lường):** Các chỉ số tracking hành vi người dùng và hệ thống log giám sát lỗi.
11. **Testing (Kiểm thử tự động):** Khả năng viết unit test và tích hợp test dễ dàng.
12. **Release & Rollback (Triển khai):** Feature flags, kiểm soát phiên bản và kịch bản rollback khẩn cấp.

Việc phân lớp khoa học này giúp quá trình estimate chính xác hơn, tránh tối đa tình trạng bỏ sót các hidden task (nhiệm vụ ẩn).

---

## 3. UI không chỉ là màn hình

Developer mới thường đánh giá độ phức tạp của UI bằng số lượng màn hình hoặc số lượng component cần tạo trên Figma. Tuy nhiên, UI complexity thực sự không nằm ở layout tĩnh mà nằm ở **state management** và **interaction behavior** (tương tác động). 

Một màn hình trông cực kỳ đơn giản trên bản vẽ thiết kế có thể trở thành một tính năng vô cùng phức tạp nếu nó sở hữu nhiều trạng thái hiển thị khác nhau.

Ví dụ, một danh sách sản phẩm tưởng chừng chỉ cần fetch API và render list. Nhưng khi đi sâu vào môi trường sản xuất thực tế, engineer cần xử lý:

*   **Loading state:** Trạng thái hiển thị spinner hoặc skeleton trong lúc chờ dữ liệu.
*   **Empty state:** Màn hình thông báo trực quan khi danh sách trả về không có sản phẩm nào.
*   **Error state:** Hiển thị thông báo lỗi chi tiết đi kèm hình ảnh/icon minh họa sinh động.
*   **Retry mechanism:** Nút "Thử lại" giúp người dùng reload nhanh dữ liệu mà không cần thoát màn hình.
*   **Pagination (Load more):** Phân trang danh sách tự động khi người dùng cuộn đến cuối trang.
*   **Pull-to-refresh:** Thao tác kéo xuống để làm mới hoàn toàn dữ liệu danh sách.
*   **Skeleton loading:** Hiệu ứng khung xương tải dữ liệu thay cho spinner đơn điệu giúp tăng UX.
*   **Offline behavior:** Cách xử lý dữ liệu khi mất kết nối mạng (hiển thị cache cũ hay báo lỗi).
*   **Search debounce:** Cơ chế trì hoãn gửi request API tìm kiếm khi người dùng đang gõ phím liên tục.
*   **Filter synchronization:** Đồng bộ hóa các bộ lọc chéo phức tạp (ví dụ lọc theo Giá + Danh mục + Đánh giá).
*   **Keyboard interaction:** Tự động ẩn bàn phím khi chạm vùng ngoài hoặc dịch chuyển view tránh bị bàn phím che khuất.
*   **Animation transition:** Các hiệu ứng chuyển động mượt mà khi lọc danh sách hoặc chuyển trang.

Mỗi một trạng thái hoặc tương tác phát sinh đều nhân bản độ phức tạp của mã nguồn.

> **Quy luật cốt lõi:**
> *"Số lượng trạng thái (states) thường phản ánh độ phức tạp thật sự của giao diện nhiều hơn là số lượng widget hay component thuần túy."*

---

## 4. API Integration luôn phức tạp hơn tưởng tượng

Một sai lầm kinh điển khi estimate là đánh giá thấp nỗ lực tích hợp API. Ở bề mặt phẳng, việc tích hợp API có vẻ rất đơn giản: *Gọi request -> Parse JSON -> Render UI*.

Nhưng trong môi trường production thực tế, networking luôn tồn tại vô vàn vấn đề bất ổn cần giải quyết triệt để:

*   **Timeout:** Xử lý thế nào khi đường truyền chập chờn và request quá thời hạn cho phép.
*   **Retry strategy:** Chiến lược tự động thử lại (ví dụ áp dụng Exponential Backoff với Jitter để tránh làm nghẽn server).
*   **Rate limit:** Xử lý lỗi HTTP 429 khi client gửi quá nhiều request vượt mức quy định của máy chủ.
*   **Inconsistent response:** Đối phó với việc dữ liệu trả về từ API không đồng nhất giữa các API hoặc các môi trường.
*   **Backward compatibility:** Đảm bảo ứng dụng phiên bản cũ không bị crash khi API thay đổi cấu trúc schema.
*   **Token expiration:** Cơ chế tự động làm mới access token thông qua refresh token (silent re-auth) mà không làm ngắt quãng luồng trải nghiệm của người dùng.
*   **Race condition & Concurrent requests:** Giải quyết xung đột khi nhiều request gọi song song hoặc xử lý bất tuần tự.
*   **Stale cache:** Kiểm soát và đồng bộ hóa giữa dữ liệu cache local và dữ liệu mới nhất trên server.

Điển hình như tính năng phân trang (Pagination), nó hoàn toàn không đơn giản là việc "tải thêm trang". Senior engineer luôn lường trước các vấn đề:
*   Tránh hiển thị trùng lặp sản phẩm (duplicate items) nếu danh sách trên server bị thay đổi thứ tự trong lúc người dùng đang cuộn.
*   Giữ nguyên vị trí cuộn (scroll position) của người dùng khi tải thêm trang mới.
*   Ngăn chặn gửi nhiều request song song (prevent multiple parallel requests) khi người dùng spam cuộn trang.
*   Hỗ trợ tải lại (retry) đúng trang bị lỗi mà không cần phải load lại từ trang đầu tiên.

Đây là lý do vì sao những feature liên quan đến đồng bộ hóa dữ liệu (data synchronization) luôn đứng đầu danh sách các tác vụ bị underestimate nhiều nhất.

---

## 5. State management là nơi complexity tăng theo cấp số nhân

Nhiều mobile developer ban đầu chỉ xem state management như việc lưu trữ dữ liệu tạm thời để cập nhật UI. Nhưng khi hệ thống phình to, quản lý trạng thái trở thành một trong những nguồn gây lỗi (bug) nhiều nhất.

Một tính năng đơn giản chỉ cần local state (như bật/tắt một dialog). Nhưng một tính năng thực tế thường đòi hỏi các cơ chế quản lý trạng thái phức tạp hơn:

*   **Shared state giữa nhiều màn hình:** Trạng thái cần đồng bộ tức thì trên nhiều màn hình khác nhau (ví dụ: giỏ hàng, thông tin user).
*   **Optimistic update:** Cập nhật UI lập tức trước khi server phản hồi thành công (ví dụ: nút Like, thả tim). Nếu API lỗi, hệ thống phải tự động hoàn tác (rollback) trạng thái UI về ban đầu một cách mượt mà.
*   **Cache synchronization:** Đồng bộ hóa dữ liệu cục bộ với dữ liệu đám mây theo thời gian thực.
*   **Realtime update:** Lắng nghe và cập nhật giao diện lập tức qua WebSockets hoặc Firebase listeners.
*   **Background refresh:** Tải và cập nhật ngầm dữ liệu ngay cả khi ứng dụng đang chạy nền.
*   **Derived state:** Các trạng thái được tính toán động từ các trạng thái khác để tránh lưu trữ dư thừa.

> **Vòng đời trạng thái (State Lifecycle):**
> Senior engineer luôn đặc biệt chú trọng kiểm soát: *Trạng thái được khởi tạo khi nào? Giải phóng (dispose) lúc nào để tránh rò rỉ bộ nhớ (memory leak)? Làm sao để không bị stale data (dữ liệu cũ)? Làm sao ngăn ngừa race condition?*
> 
> Một tính năng càng chứa nhiều yếu tố đồng bộ hóa trạng thái chéo thì estimate bắt buộc phải có thêm phần đệm thời gian (buffer) hợp lý.

---

## 6. Mobile development luôn tồn tại platform-specific complexity

Một trong những khác biệt lớn nhất giữa mobile và web là hành vi của ứng dụng phụ thuộc cực kỳ sâu vào hệ điều hành nền tảng (OS). Một tính năng hoạt động hoàn hảo trên Android chưa chắc đã chạy ổn định trên iOS và ngược lại.

| Tính năng | Phức tạp đặc thù trên Android | Phức tạp đặc thù trên iOS |
| :--- | :--- | :--- |
| **Social Login** | Cấu hình SHA1 key, Intent filters, Play Services compatibility | Cấu hình URL Schemes, Associated Domains, Apple Sign-In compliance |
| **Media & Files** | Runtime permissions phức tạp, Scoped storage, File Provider | Photos library permissions, Sandbox file access, iCloud sync |
| **Background Tasks** | Battery optimization, WorkManager, Doze mode restrictions | Background Fetch, Background Tasks framework, Suspended state lifecycle |

Mỗi khi nhận yêu cầu, senior engineer luôn trăn trở câu hỏi: **“Tính năng này có phần nào chịu ảnh hưởng bởi đặc tính riêng biệt của nền tảng OS hay không?”** Việc nhận diện sớm các điểm khác biệt này sẽ loại bỏ hoàn toàn các rủi ro làm trễ hạn release dự án.

---

## 7. Edge cases là nơi estimate thật sự xuất hiện

Một tính năng hiếm khi gặp lỗi ở luồng chạy thông thường (happy path). Phần lớn các lỗi nghiêm trọng trên production đều xuất hiện ở các luồng biên (edge cases).

Hãy lấy ví dụ về một tính năng tưởng chừng cực kỳ cơ bản: **Tải ảnh đại diện (Upload avatar)**.
*   **Góc nhìn Junior (Happy Path):** *Mở thư viện ảnh -> Chọn ảnh -> Gọi API upload lên server.* (Estimate: 1 - 2 ngày).
*   **Góc nhìn Senior (Edge Cases & UX):**
    *   Người dùng từ chối cấp quyền truy cập Camera/Photos (cần hiển thị hướng dẫn mở cài đặt hệ thống).
    *   Ảnh chọn có dung lượng quá lớn (cần nén ảnh - image compression - trước khi upload để tiết kiệm băng thông).
    *   Tiến trình upload bị đứt quãng giữa chừng do mạng yếu (cần hỗ trợ resume hoặc hiển thị thông báo lỗi rõ ràng).
    *   Ảnh chụp từ một số thiết bị bị xoay ngược góc do dữ liệu EXIF không chuẩn (cần auto-rotate dựa trên EXIF metadata).
    *   Người dùng nhấn nút "Upload" liên tục (cần block tương tác UI để tránh gửi nhiều request trùng lặp).
    *   Định dạng file không được hỗ trợ hoặc file bị lỗi (cần validate kỹ ở client).

> **Nhận thức cốt lõi:**
> *"Nỗ lực (effort) và thời gian để xử lý triệt để các edge cases thường lớn hơn rất nhiều so với thời gian viết mã cho happy path. Đó là lý do vì sao estimate của senior luôn chứa thời gian nghiên cứu và xử lý unknown behaviors."*

---

## 8. Authentication là một domain đặc biệt

Authentication (Xác thực người dùng) là một trong những loại tính năng thường bị underestimate nặng nề nhất. Lý do là vì auth không chỉ đơn thuần là các ô nhập liệu UI hay các API endpoints, nó là một hệ sinh thái phức tạp liên quan mật thiết đến bảo mật và vòng đời phiên làm việc:

*   **Security (Bảo mật chuyên sâu):** Mã hóa thông tin nhạy cảm trước khi lưu xuống bộ nhớ, sử dụng Keystore (Android) / Keychain (iOS) bảo mật tối đa, triển khai SSL Pinning để phòng chống các cuộc tấn công Man-In-The-Middle (MITM).
*   **Session Lifecycle (Vòng đời phiên):** 
    *   Cách thức lưu trữ token an toàn.
    *   Cơ chế refresh token tự động dưới background khi hết hạn.
    *   Khôi phục phiên làm việc cũ (session restore) khi người dùng tắt hẳn app rồi mở lại.
    *   Quy trình dọn dẹp sạch sẽ dữ liệu cục bộ (logout cleanup) để tránh rò rỉ thông tin cá nhân.
    *   Xử lý khi token bị thu hồi đột ngột từ phía server (session revocation).
    *   Xử lý tài khoản bị đăng nhập đồng thời trên nhiều thiết bị (multiple device behavior).
*   **Navigation & User Recovery:** Tự động điều hướng người dùng ra màn hình Welcome/Login khi session hết hạn, khôi phục lại màn hình người dùng đang đứng trước đó sau khi re-auth thành công.

Authentication gần như luôn yêu cầu mức độ cẩn trọng rất cao, và estimate cho phần này luôn cần một lượng thời gian buffer lớn.

---

## 9. Production concerns là thứ junior thường quên

Một tính năng chạy mượt mà trên môi trường local (giả lập hoặc thiết bị test cắm dây) chưa bao giờ đồng nghĩa với việc tính năng đó đã sẵn sàng phát hành rộng rãi tới hàng nghìn người dùng thực tế. 

Khi thực hiện estimate, các senior engineer luôn chủ động đưa các "Production concerns" vào checklist:

*   **Analytics Tracking:** Cài đặt các sự kiện (events) để đo lường hiệu quả tính năng và hành vi người dùng trên production.
*   **Crash Reporting & Monitoring:** Tích hợp Firebase Crashlytics để phát hiện lỗi crash lập tức, thiết lập logs chi tiết giúp khoanh vùng và tái hiện lỗi từ xa nhanh chóng.
*   **Feature Flag (Feature Toggle):** Đóng gói tính năng mới trong một feature flag để có thể bật/tắt từ xa trên production mà không cần phát hành bản cập nhật app mới.
*   **Rollback Strategy:** Xây dựng kịch bản ứng phó khẩn cấp nếu tính năng mới phát sinh lỗi nghiêm trọng sau khi release.
*   **Performance Impact:** Đảm bảo tính năng mới không làm tăng thời gian khởi động app (startup time), không gây tràn bộ nhớ (out-of-memory) hay ngốn pin thiết bị một cách bất thường.

Những tác vụ kỹ thuật này thường hoàn toàn không có trên các mô tả ticket nghiệp vụ thông thường, nhưng lại quyết định trực tiếp đến sự thành bại của sản phẩm khi ra mắt thị trường.

---

## 10. Testing không phải là phần “nếu còn thời gian”

Một trong những ranh giới phân định rõ ràng nhất giữa junior và senior là thái độ đối với việc viết kiểm thử (testing). Junior thường xem testing là một phần tùy chọn (optional) chỉ làm khi còn thừa thời gian. Senior xem testing là một phần cốt lõi bắt buộc của quá trình implementation.

Khi đưa ra con số estimate, một senior engineer luôn tính toán kỹ lượng effort dành cho:

*   **Unit Tests:** Kiểm thử các hàm xử lý logic nghiệp vụ tách biệt.
*   **Widget / UI Tests:** Đảm bảo các component giao diện hiển thị đúng và tương tác chuẩn xác theo thiết kế.
*   **Integration Tests:** Kiểm thử sự phối hợp hoạt động nhịp nhàng giữa các module với nhau.
*   **Regression Testing:** Đảm bảo việc thêm tính năng mới không vô tình làm hỏng các tính năng cũ đang hoạt động ổn định.

Đặc biệt trong lập trình ứng dụng di động, các lỗi regression cực kỳ dễ xảy ra do tính chất dùng chung bộ nhớ (shared state), chia sẻ điều hướng (navigation stack) và sự bất tuần tự của vòng đời ứng dụng di động (app lifecycle).

---

## 11. Unknown luôn tồn tại trong estimate

Không có bất kỳ bản estimate nào có thể đạt độ chính xác tuyệt đối 100%. Senior engineer hiểu rõ rằng phát triển phần mềm luôn chứa đựng các yếu tố bất định (unknown factors):

*   Tài liệu API từ Backend chưa hoàn thiện, hoặc liên tục thay đổi contract trong quá trình tích hợp.
*   Các thư viện/SDK của bên thứ ba (third-party SDK) hoạt động không ổn định hoặc thiếu tài liệu hướng dẫn chuẩn xác.
*   Mã nguồn cũ (legacy code) quá phức tạp, chằng chịt các mối quan hệ đan xen và rất khó dự đoán tác động phụ.
*   Yêu cầu nghiệp vụ từ phía business/khách hàng có thể thay đổi đột ngột giữa chừng.

Vì vậy, senior engineer không cố gắng đưa ra một con số estimate cứng nhắc để làm hài lòng người nghe. Mục tiêu cốt lõi của họ khi estimate là: **Giảm thiểu các yếu tố bất ngờ (reduce surprises), truyền thông rõ ràng các rủi ro tiềm ẩn (communicate risks), nhận diện sớm các điểm phức tạp ẩn giấu và xây dựng một kỳ vọng thực tế cho toàn đội ngũ.**

> **Triết lý của Senior:**
> *"Estimate tốt không phải là một bản estimate có số ngày cực kỳ ngắn. Estimate tốt là một bản estimate có độ tin cậy cực kỳ cao."*

---

## 12. Buffer là dấu hiệu của kinh nghiệm, không phải thiếu năng lực

Các lập trình viên trẻ tuổi thường rất e ngại việc cộng thêm thời gian dự phòng (buffer) vào estimate vì lo sợ ban quản lý hoặc đồng nghiệp đánh giá mình "lập trình chậm" hay "thiếu năng lực". 

Tuy nhiên, thực tế chứng minh điều ngược lại hoàn toàn. Buffer thời gian tồn tại không phải để trì hoãn công việc, mà để phản ánh sự không chắc chắn tự nhiên của công nghệ và quy trình:
*   Bug phát sinh ngoài ý muốn luôn xuất hiện ở mọi giai đoạn.
*   Sự ma sát (friction) trong khâu tích hợp hệ thống là không thể tránh khỏi.
*   Môi trường thực tế trên thiết bị của người dùng luôn đa dạng và phức tạp hơn rất nhiều môi trường giả lập cục bộ.

Tùy thuộc vào mức độ rủi ro và độ mới của công nghệ, các senior engineer luôn có công thức cộng thêm buffer khoa học:

*   **Giao diện UI đơn giản:** Cộng thêm **20%** effort để tinh chỉnh animation và tối ưu responsive.
*   **Tích hợp SDK bên thứ ba:** Cộng thêm **50%** effort dự phòng trường hợp thư viện lỗi hoặc không tương thích OS mới.
*   **Xử lý Thanh toán (Payment) hoặc Xác thực (Auth):** Cộng thêm **70%** effort vì độ nhạy cảm cao, yêu cầu bảo mật khắt khe và test kịch liệt.
*   **Tái cấu trúc mã nguồn cũ (Legacy Refactor):** Đôi khi cần cộng thêm từ **100% đến 150%** so với estimate ban đầu vì cấu trúc cũ thường ẩn chứa rất nhiều rủi ro phá vỡ hệ thống hiện tại.

---

## Kết luận: Một senior thực sự đang estimate điều gì?

Tóm lại, sự khác biệt lớn nhất nằm ở tư duy tiếp cận:
> **Senior engineer không bao giờ chỉ estimate:**
> *"Tôi mất bao nhiêu lâu để gõ xong những dòng code đầu tiên cho tính năng này chạy được trên máy của tôi."*
> 
> **Họ luôn luôn estimate:**
> *"Cần bao nhiêu nguồn lực và nỗ lực để tính năng này hoạt động ổn định, dễ bảo trì, an toàn bảo mật và sẵn sàng phục vụ hàng chục nghìn người dùng thực tế trên môi trường production."*

Chính vì sở hữu tư duy phân lớp toàn diện này, các bản estimate của các senior engineer luôn thực tế hơn, ít gặp các bất ngờ tiêu cực hơn, ít khi bị trễ hạn phát hành và mang lại sự an tâm tuyệt đối cho toàn bộ đội ngũ phát triển dự án. Khả năng estimate chuẩn xác chính là thước đo chân thực nhất phản ánh sự trưởng thành và bản lĩnh của một software engineer thực thụ.