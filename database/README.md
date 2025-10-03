# Online Learning Platform - Database Documentation

## Tổng quan Database

Database được thiết kế cho hệ thống Online Learning Platform với các chức năng đầy đủ cho 5 loại người dùng: Guest, Customer, Instructor, Moderator, và Admin.

## Cấu trúc Database

### 1. USER MANAGEMENT (Quản lý người dùng)

#### **Users**
- `UserId` (PK): ID người dùng
- `Email`: Email đăng nhập (unique)
- `PasswordHash`: Mật khẩu đã hash
- `FirstName`, `LastName`: Họ và tên
- `Avatar`: Ảnh đại diện
- `Phone`, `DateOfBirth`, `Gender`, `Bio`: Thông tin cá nhân
- `IsActive`, `IsBanned`, `EmailVerified`: Trạng thái tài khoản
- `CreatedAt`, `UpdatedAt`: Thời gian tạo và cập nhật

#### **Roles**
- `RoleId` (PK): ID vai trò
- `RoleName`: Tên vai trò (Guest, Customer, Instructor, Moderator, Admin)
- `Description`: Mô tả vai trò

#### **UserRoles**
- Bảng trung gian many-to-many giữa Users và Roles
- Một user có thể có nhiều role

#### **InstructorApplications**
- `ApplicationId` (PK): ID đơn đăng ký
- `UserId` (FK): User đăng ký làm giảng viên
- `Qualifications`: Bằng cấp
- `Experience`: Kinh nghiệm
- `CertificateFiles`: File chứng chỉ (JSON array)
- `Status`: Trạng thái (Pending, Approved, Rejected)
- `ReviewedBy`, `ReviewedAt`, `ReviewNotes`: Thông tin duyệt đơn

### 2. COURSE MANAGEMENT (Quản lý khóa học)

#### **Categories**
- `CategoryId` (PK): ID danh mục
- `CategoryName`: Tên danh mục
- `Description`, `Icon`: Mô tả và icon

#### **Courses**
- `CourseId` (PK): ID khóa học
- `InstructorId` (FK): Giảng viên tạo khóa học
- `CategoryId` (FK): Danh mục khóa học
- `Title`, `Description`, `ShortDescription`: Tiêu đề và mô tả
- `Thumbnail`: Ảnh thumbnail
- `Price`, `DiscountPrice`: Giá gốc và giá giảm
- `Level`: Cấp độ (Beginner, Intermediate, Advanced)
- `Duration`: Thời lượng (phút)
- `Language`: Ngôn ngữ
- `Prerequisites`: Điều kiện tiên quyết
- `WhatYouWillLearn`: Những gì học được (JSON array)
- `IsPublished`, `IsActive`: Trạng thái khóa học
- `EnrollmentCount`: Số lượng học viên
- `AverageRating`, `TotalRatings`: Đánh giá

#### **CourseSections**
- `SectionId` (PK): ID chương
- `CourseId` (FK): Khóa học
- `Title`, `Description`: Tiêu đề và mô tả chương
- `OrderIndex`: Thứ tự chương

#### **Lessons**
- `LessonId` (PK): ID bài học
- `SectionId` (FK): Chương chứa bài học
- `Title`: Tiêu đề bài học
- `Content`: Nội dung HTML
- `VideoUrl`: Link video
- `Duration`: Thời lượng
- `OrderIndex`: Thứ tự bài học
- `IsPreview`: Có thể xem trước không
- `IsActive`: Trạng thái

#### **Enrollments**
- `EnrollmentId` (PK): ID đăng ký
- `UserId` (FK): Học viên
- `CourseId` (FK): Khóa học
- `EnrolledAt`: Thời gian đăng ký
- `CompletedAt`: Thời gian hoàn thành
- `Progress`: Tiến độ học (%)
- `LastAccessedAt`: Lần truy cập cuối
- `Status`: Trạng thái (Active, Completed, Dropped)

#### **LessonProgress**
- Theo dõi tiến độ học từng bài của từng học viên
- `EnrollmentId` (FK), `LessonId` (FK)
- `IsCompleted`: Đã hoàn thành
- `WatchTime`: Thời gian xem (giây)
- `CompletedAt`, `LastAccessedAt`

#### **CourseReviews**
- `ReviewId` (PK): ID đánh giá
- `UserId` (FK), `CourseId` (FK)
- `Rating`: Điểm đánh giá (1-5)
- `Review`: Nội dung đánh giá
- `IsActive`: Trạng thái

### 3. QUIZ SYSTEM (Hệ thống quiz)

#### **Quizzes**
- `QuizId` (PK): ID quiz
- `CourseId` (FK): Khóa học
- `SectionId` (FK), `LessonId` (FK): Có thể gắn với chương hoặc bài học
- `Title`, `Description`: Tiêu đề và mô tả
- `TimeLimit`: Giới hạn thời gian (phút)
- `PassingScore`: Điểm đạt (%)
- `MaxAttempts`: Số lần làm tối đa

#### **QuizQuestions**
- `QuestionId` (PK): ID câu hỏi
- `QuizId` (FK): Quiz chứa câu hỏi
- `Question`: Nội dung câu hỏi
- `QuestionType`: Loại câu hỏi (MultipleChoice, TrueFalse, Essay)
- `Points`: Điểm câu hỏi
- `OrderIndex`: Thứ tự

#### **QuizQuestionOptions**
- `OptionId` (PK): ID đáp án
- `QuestionId` (FK): Câu hỏi
- `OptionText`: Nội dung đáp án
- `IsCorrect`: Đáp án đúng
- `OrderIndex`: Thứ tự

#### **QuizAttempts**
- `AttemptId` (PK): ID lần làm
- `UserId` (FK), `QuizId` (FK)
- `StartedAt`, `CompletedAt`: Thời gian bắt đầu và kết thúc
- `Score`, `TotalPoints`, `Percentage`: Điểm số
- `IsPassed`: Đạt hay không
- `AttemptNumber`: Lần làm thứ mấy

#### **QuizAnswers**
- `AnswerId` (PK): ID câu trả lời
- `AttemptId` (FK): Lần làm
- `QuestionId` (FK): Câu hỏi
- `SelectedOptionId` (FK): Đáp án chọn (cho multiple choice)
- `AnswerText`: Câu trả lời (cho essay)
- `IsCorrect`: Đúng hay sai
- `Points`: Điểm đạt được

### 4. SHOPPING & PAYMENT (Giỏ hàng & Thanh toán)

#### **CartItems**
- `CartItemId` (PK): ID item trong giỏ
- `UserId` (FK), `CourseId` (FK)
- `AddedAt`: Thời gian thêm vào giỏ

#### **Orders**
- `OrderId` (PK): ID đơn hàng
- `UserId` (FK): Người mua
- `OrderNumber`: Mã đơn hàng (unique)
- `TotalAmount`, `DiscountAmount`, `FinalAmount`: Giá tiền
- `Status`: Trạng thái (Pending, Paid, Cancelled, Refunded)

#### **OrderItems**
- `OrderItemId` (PK): ID item trong đơn hàng
- `OrderId` (FK), `CourseId` (FK)
- `Price`, `DiscountPrice`, `FinalPrice`: Giá của từng khóa học

#### **Payments**
- `PaymentId` (PK): ID thanh toán
- `OrderId` (FK): Đơn hàng
- `PaymentMethod`: Phương thức (QR, BankTransfer, Card)
- `PaymentProvider`: Nhà cung cấp (VNPay, MoMo, etc.)
- `TransactionId`: Mã giao dịch
- `Amount`: Số tiền
- `Status`: Trạng thái (Pending, Completed, Failed, Cancelled)
- `QRCodeUrl`, `PaymentUrl`: Link QR và thanh toán

### 5. FORUM SYSTEM (Hệ thống diễn đàn)

#### **ForumCategories**
- `CategoryId` (PK): ID danh mục forum
- `CategoryName`: Tên danh mục
- `Description`, `Icon`: Mô tả và icon

#### **Forums**
- `ForumId` (PK): ID bài viết
- `UserId` (FK): Người tạo
- `CategoryId` (FK): Danh mục
- `Title`, `Content`: Tiêu đề và nội dung
- `IsPinned`: Ghim bài
- `IsClosed`: Đóng bài (không reply được)
- `IsBanned`: Bị ban
- `ViewCount`, `ReplyCount`: Số lượt xem và reply

#### **ForumReplies**
- `ReplyId` (PK): ID reply
- `ForumId` (FK): Bài viết gốc
- `UserId` (FK): Người reply
- `ParentReplyId` (FK): Reply cha (cho nested reply)
- `Content`: Nội dung reply
- `LikeCount`: Số like
- `IsReported`, `IsBanned`: Trạng thái

#### **ForumReplyLikes**
- Bảng many-to-many cho like reply
- `ReplyId` (FK), `UserId` (FK)

### 6. LESSON COMMENTS (Bình luận bài học)

#### **LessonComments**
- `CommentId` (PK): ID comment
- `LessonId` (FK): Bài học
- `UserId` (FK): Người comment
- `ParentCommentId` (FK): Comment cha
- `Content`: Nội dung
- `LikeCount`: Số like
- `IsReported`, `IsBanned`: Trạng thái

#### **LessonCommentLikes**
- Bảng many-to-many cho like comment
- `CommentId` (FK), `UserId` (FK)

### 7. SUPPORT SYSTEM (Hệ thống hỗ trợ)

#### **SupportTickets**
- `TicketId` (PK): ID ticket
- `UserId` (FK): Người tạo ticket
- `Subject`, `Description`: Tiêu đề và mô tả
- `Priority`: Độ ưu tiên (Low, Medium, High, Urgent)
- `Status`: Trạng thái (Open, InProgress, Resolved, Closed)
- `AssignedTo` (FK): Moderator được giao
- `ClosedAt`: Thời gian đóng

#### **TicketMessages**
- `MessageId` (PK): ID tin nhắn
- `TicketId` (FK): Ticket
- `UserId` (FK): Người gửi
- `Message`: Nội dung
- `IsFromStaff`: Từ nhân viên hay không

### 8. NOTIFICATION SYSTEM (Hệ thống thông báo)

#### **Notifications**
- `NotificationId` (PK): ID thông báo
- `UserId` (FK): Người nhận
- `Title`, `Message`: Tiêu đề và nội dung
- `Type`: Loại thông báo
- `RelatedEntityId`, `RelatedEntityType`: Entity liên quan
- `IsRead`: Đã đọc chưa
- `ReadAt`: Thời gian đọc

### 9. REPORTING SYSTEM (Hệ thống báo cáo)

#### **Reports**
- `ReportId` (PK): ID báo cáo
- `ReportedBy` (FK): Người báo cáo
- `ReportedEntityType`: Loại entity bị báo cáo
- `ReportedEntityId`: ID entity bị báo cáo
- `ReportedUserId` (FK): User bị báo cáo
- `Reason`: Lý do báo cáo
- `Description`: Mô tả chi tiết
- `Status`: Trạng thái (Pending, Reviewed, Resolved, Dismissed)
- `ReviewedBy` (FK): Người xem xét

### 10. INSTRUCTOR PAYMENT (Thanh toán giảng viên)

#### **InstructorPaymentSettings**
- `SettingId` (PK): ID cài đặt
- `InstructorId` (FK): Giảng viên
- `BankName`, `BankAccountNumber`, `BankAccountHolderName`: Thông tin ngân hàng
- `PayPalEmail`: Email PayPal
- `TaxId`: Mã số thuế
- `CommissionRate`: Tỷ lệ hoa hồng (mặc định 70%)

## Chức năng theo vai trò

### **Guest (Khách)**
- Xem homepage, chi tiết khóa học
- Đăng ký, đăng nhập
- Thêm khóa học vào giỏ hàng
- Xem forum (không tương tác)
- Search, filter khóa học
- Chatbot AI

### **Customer (Học viên)**
- Tất cả chức năng của Guest +
- Đăng ký và thanh toán khóa học
- Xem danh sách bài giảng đã đăng ký
- Comment, like, reply bài giảng
- Làm quiz, xem điểm
- Quản lý profile
- Tạo và quản lý ticket hỗ trợ
- Tạo, tham gia forum
- Nhận thông báo

### **Instructor (Giảng viên)**
- Tất cả chức năng của Customer +
- Tạo hồ sơ giảng viên
- Tạo, chỉnh sửa khóa học
- Quản lý mục lục, bài giảng, quiz
- Xem danh sách học viên
- Cài đặt thông tin thanh toán
- Xem dashboard doanh số

### **Moderator (Người kiểm duyệt)**
- Duyệt hồ sơ giảng viên
- Quản lý danh sách giảng viên
- Xử lý ticket hỗ trợ
- Ban/unban user, giảng viên
- Kiểm duyệt forum
- Xử lý báo cáo

### **Admin (Quản trị viên)**
- Tất cả quyền của hệ thống
- Xem dashboard tổng quan
- Quản lý moderator
- Thống kê hệ thống

## Indexes

Database có các index được tối ưu cho:
- Tìm kiếm user theo email
- Tìm kiếm khóa học theo giảng viên, danh mục
- Tìm kiếm forum, comment
- Tìm kiếm thông báo
- Tìm kiếm đơn hàng, thanh toán

## Sample Data

File SQL đã bao gồm:
- 5 roles cơ bản
- 8 categories khóa học
- 5 forum categories
- 1 admin user mặc định (admin@onlinelearning.com / Admin@123)

## Cách sử dụng

1. Chạy script SQL trong SQL Server Management Studio
2. Database và tất cả bảng sẽ được tạo tự động
3. Sample data sẽ được insert
4. Sử dụng admin account để đăng nhập lần đầu

Database này hỗ trợ đầy đủ các chức năng bạn yêu cầu và có thể mở rộng dễ dàng trong tương lai.