Tư duy Estimate trong Mobile Development
Cách một Senior Engineer phân tích và dự đoán effort của một feature
Estimate là một trong những kỹ năng khó nhất trong software engineering, đặc biệt ở mobile development. Phần lớn developer ở giai đoạn đầu sự nghiệp thường nhìn estimation như việc “đo thời gian để code xong một tính năng”. Tuy nhiên, với những engineer có nhiều kinh nghiệm hơn, estimate không còn đơn thuần là việc đo lượng code cần viết. Nó là quá trình phân tích toàn bộ hệ thống, nhận diện complexity tiềm ẩn, đánh giá rủi ro, hiểu dependency và dự đoán những vấn đề có khả năng xảy ra khi feature được đưa vào môi trường production.
Đó cũng là lý do vì sao cùng một feature nhưng estimate của junior và senior có thể chênh lệch rất lớn.
Khi nhận một yêu cầu như “Implement Google Login”, một developer ít kinh nghiệm thường chỉ nghĩ đến việc tạo nút login, gọi SDK Google Sign-In và gửi token lên server. Trong khi đó, một senior engineer sẽ ngay lập tức mở rộng góc nhìn sang nhiều lớp khác nhau của hệ thống.
Họ sẽ nghĩ đến OAuth flow hoạt động như thế nào, token sẽ được lưu ở đâu, refresh token xử lý ra sao khi hết hạn, deeplink có cần cấu hình hay không, Android cần SHA1 gì, iOS cần URL Scheme hay Associated Domain gì, người dùng bấm login nhiều lần liên tục sẽ thế nào, nếu mạng yếu hoặc request timeout thì UX sẽ ra sao, analytics cần track event gì, crash có cần report không, session sẽ được restore như thế nào khi app restart, và feature này có ảnh hưởng gì tới navigation flow hiện tại hay không.
Đây là sự khác biệt cốt lõi giữa “code feature” và “deliver production-ready feature”.

Estimate không phải là đo thời gian code
Một hiểu nhầm phổ biến của developer là cho rằng estimate chỉ liên quan đến implementation. Trên thực tế, phần coding thường chỉ là một phần trong tổng effort của một feature.
Một feature hoàn chỉnh thường bao gồm rất nhiều hoạt động khác ngoài việc viết code:


phân tích requirement


đọc và hiểu business logic


setup environment


integration với backend


xử lý edge cases


testing


bug fixing


review feedback


resolve conflict khi merge code


hỗ trợ QA


monitoring sau release


Senior engineer hiểu rằng phần lớn thời gian của software development không nằm ở việc “viết dòng code đầu tiên”, mà nằm ở việc đảm bảo feature hoạt động ổn định trong mọi tình huống thực tế.
Vì vậy, estimate của senior thường bao gồm cả implementation cost lẫn operational cost của feature.

Tư duy phân lớp khi estimate
Một senior mobile developer thường không nhìn feature như một khối duy nhất. Họ chia feature thành nhiều layer khác nhau để phân tích complexity.
Thông thường, khi nhận một task, họ sẽ quét qua các góc nhìn sau:


UI Layer


State Management


Business Logic


API & Networking


Storage


Authentication & Security


Platform-specific behavior


Navigation


Error Handling


Analytics & Monitoring


Testing


Release & Rollback


Việc phân lớp này giúp estimate chính xác hơn và giảm khả năng bỏ sót hidden task.

UI không chỉ là màn hình
Developer mới thường đánh giá UI bằng số lượng màn hình hoặc số lượng component cần tạo. Tuy nhiên, UI complexity không nằm ở phần layout mà nằm ở state management và interaction behavior.
Một màn hình đơn giản trên Figma có thể trở thành một feature rất phức tạp nếu nó có nhiều state khác nhau.
Ví dụ, một danh sách sản phẩm tưởng chừng chỉ cần fetch API và render list. Nhưng khi đi sâu hơn, engineer cần nghĩ tới:


loading state


empty state


error state


retry mechanism


pagination


pull-to-refresh


skeleton loading


offline behavior


search debounce


filter synchronization


keyboard interaction


animation transition


Mỗi state mới đều làm tăng complexity của feature.
Senior engineer luôn hiểu rằng:

số lượng state thường phản ánh độ phức tạp thật sự của UI nhiều hơn số lượng widget.


API Integration luôn phức tạp hơn tưởng tượng
Một sai lầm phổ biến khi estimate là đánh giá thấp effort của việc tích hợp API.
Ở bề mặt, API integration chỉ là:


gọi request


parse response


render UI


Nhưng trong production environment, networking luôn tồn tại rất nhiều vấn đề cần xử lý:


timeout


retry strategy


rate limit


inconsistent response


backward compatibility


token expiration


race condition


concurrent request


stale cache


pagination synchronization


Ví dụ, pagination không chỉ là “load thêm dữ liệu”. Nó còn liên quan tới:


duplicate item


scroll position


loading synchronization


preventing multiple parallel requests


retry after fail


refresh consistency


Đây là lý do những feature liên quan đến data synchronization thường bị underestimate.

State management là nơi complexity tăng theo cấp số nhân
Nhiều mobile developer ban đầu chỉ xem state management như việc lưu dữ liệu để update UI. Nhưng khi hệ thống lớn dần, state trở thành một trong những nguồn gây bug nhiều nhất.
Một feature đơn giản sẽ chỉ có local state. Nhưng feature phức tạp hơn thường có:


shared state giữa nhiều màn hình


optimistic update


cache synchronization


realtime update


background refresh


partial loading


derived state


temporary state


Senior engineer luôn chú ý đến lifecycle của state:


state được tạo khi nào


dispose lúc nào


có leak memory không


có stale data không


có race condition không


Một feature càng liên quan tới synchronization, estimate càng phải có thêm buffer.

Mobile development luôn tồn tại platform-specific complexity
Một trong những khác biệt lớn nhất giữa mobile và web là behavior của ứng dụng phụ thuộc rất nhiều vào platform.
Một feature hoạt động ổn trên Android chưa chắc đã ổn trên iOS.
Ví dụ, khi implement social login, Android cần:


SHA1 configuration


intent filter


Play Services compatibility


Trong khi iOS lại cần:


URL Scheme


Associated Domain


reversed client ID


Apple Sign-In compliance


Tương tự, media handling trên Android và iOS có rất nhiều khác biệt về permission, file access và lifecycle.
Senior engineer luôn dành thời gian để nghĩ:

“Feature này có phần nào phụ thuộc platform không?”

Đây là một trong những hidden complexity phổ biến nhất của mobile development.

Edge cases là nơi estimate thật sự xuất hiện
Một feature hiếm khi fail ở “happy path”. Phần lớn bug production xuất hiện ở edge cases.
Ví dụ, upload avatar không chỉ là:


chọn ảnh


upload lên server


Mà còn phải nghĩ đến:


user từ chối permission


ảnh quá lớn


upload bị cancel giữa chừng


mạng yếu


duplicate upload


unsupported file format


rotated EXIF image


user spam upload liên tục


Senior engineer hiểu rằng:

effort để xử lý edge cases thường lớn hơn happy path.

Đó là lý do estimate của họ luôn bao gồm phần buffer cho unknown behavior.

Authentication là một domain đặc biệt
Authentication là một trong những loại feature thường bị underestimate nhiều nhất.
Lý do là vì auth không chỉ là UI hay API. Nó liên quan đến:


security


session lifecycle


storage


platform configuration


navigation flow


recovery behavior


Ví dụ, sau khi login thành công, engineer cần nghĩ:


token lưu ở đâu


token refresh ra sao


session restore khi reopen app


logout cleanup


session expiration handling


multiple device behavior


revoked token


account conflict


unauthorized redirect


Ngoài ra còn có:


analytics tracking


security concern


biometric auth


secure storage


SSL pinning


Authentication gần như luôn cần estimate cao hơn dự đoán ban đầu.

Production concern là thứ junior thường quên
Một feature chạy được trên local chưa có nghĩa là feature sẵn sàng release.
Senior engineer thường nghĩ thêm về:


analytics


crash reporting


monitoring


logging


feature flag


rollback strategy


performance impact


Ví dụ:


feature này có làm app startup chậm hơn không?


có tăng memory usage không?


có tạo crash mới không?


analytics có đủ để debug production issue không?


Những thứ này thường không xuất hiện trên ticket nhưng lại rất quan trọng trong môi trường production.

Testing không phải là phần “nếu còn thời gian”
Một trong những điểm khác biệt lớn giữa junior và senior là cách họ nhìn testing.
Junior thường xem testing là optional. Senior xem testing là một phần của implementation.
Khi estimate, senior thường nghĩ tới:


unit test


widget/UI test


integration test


regression testing


manual QA support


Đặc biệt ở mobile development, regression rất phổ biến vì:


shared state


navigation dependency


platform lifecycle


async behavior


Do đó, feature càng ảnh hưởng nhiều module, testing effort càng tăng mạnh.

Unknown luôn tồn tại trong estimate
Không có estimate nào chính xác tuyệt đối.
Senior engineer hiểu rằng software development luôn tồn tại unknown:


backend chưa hoàn thiện


SDK chưa stable


legacy code khó predict


requirement có thể thay đổi


undocumented behavior


Vì vậy, senior không cố estimate chính xác tuyệt đối. Họ cố:


giảm surprise


communicate risk


identify hidden complexity


tạo expectation hợp lý


Estimate tốt không phải estimate thấp.
Estimate tốt là estimate đáng tin.

Buffer là dấu hiệu của kinh nghiệm, không phải thiếu năng lực
Developer ít kinh nghiệm thường sợ thêm buffer vì nghĩ rằng điều đó thể hiện mình “code chậm”.
Nhưng thực tế, buffer tồn tại vì:


bug luôn xuất hiện


requirement luôn thay đổi


integration luôn có friction


production luôn khác local


Senior engineer thường cộng thêm effort dựa trên độ rủi ro của feature.
Ví dụ:


simple UI có thể thêm 20%


third-party SDK có thể thêm 50%


payment hoặc authentication có thể thêm 70%


legacy refactor đôi khi cần gấp đôi estimate ban đầu


Buffer không phải để “câu giờ”.
Buffer là để phản ánh uncertainty của software engineering.

Một senior thực sự đang estimate điều gì?
Cuối cùng, điều quan trọng nhất cần hiểu là:
Senior engineer không estimate:

“Mất bao lâu để viết xong code.”

Họ estimate:

“Cần bao nhiêu effort để feature này hoạt động ổn định, maintainable và production-ready cho hàng nghìn người dùng.”

Đó là lý do estimate của senior thường:


thực tế hơn


ít surprise hơn


ít missed task hơn


ít bug production hơn


Và đó cũng là lý do estimation là kỹ năng phản ánh rất rõ mức độ trưởng thành của một software engineer.