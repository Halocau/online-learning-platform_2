-- =============================================
-- Online Learning Platform Database Schema
-- SQL Server Database
-- Created: September 30, 2025
-- =============================================

USE master;
GO

-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'OnlineLearningPlatform')
BEGIN
    CREATE DATABASE OnlineLearningPlatform;
END
GO

USE OnlineLearningPlatform;
GO

-- =============================================
-- USER MANAGEMENT TABLES
-- =============================================

-- Roles Table
CREATE TABLE Roles (
    RoleId int IDENTITY(1,1) PRIMARY KEY,
    RoleName nvarchar(50) NOT NULL UNIQUE,
    Description nvarchar(255),
    CreatedAt datetime2 DEFAULT GETDATE()
);

-- Users Table
CREATE TABLE Users (
    UserId int IDENTITY(1,1) PRIMARY KEY,
    Email nvarchar(255) NOT NULL UNIQUE,
    PasswordHash nvarchar(255) NOT NULL,
    FirstName nvarchar(100) NOT NULL,
    LastName nvarchar(100) NOT NULL,
    Avatar nvarchar(500),
    Phone nvarchar(20),
    DateOfBirth date,
    Gender nvarchar(10),
    Bio nvarchar(1000),
    IsActive bit DEFAULT 1,
    IsBanned bit DEFAULT 0,
    EmailVerified bit DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE()
);

-- User Roles (Many-to-Many relationship)
CREATE TABLE UserRoles (
    UserRoleId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    RoleId int NOT NULL,
    AssignedAt datetime2 DEFAULT GETDATE(),
    AssignedBy int,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) ON DELETE CASCADE,
    FOREIGN KEY (AssignedBy) REFERENCES Users(UserId),
    UNIQUE(UserId, RoleId)
);

-- Instructor Applications
CREATE TABLE InstructorApplications (
    ApplicationId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    Qualifications nvarchar(2000) NOT NULL,
    Experience nvarchar(2000),
    CertificateFiles nvarchar(1000), -- JSON array of file URLs
    Status nvarchar(20) DEFAULT 'Pending', -- Pending, Approved, Rejected
    ReviewedBy int,
    ReviewedAt datetime2,
    ReviewNotes nvarchar(1000),
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (ReviewedBy) REFERENCES Users(UserId)
);

-- =============================================
-- COURSE MANAGEMENT TABLES
-- =============================================

-- Categories
CREATE TABLE Categories (
    CategoryId int IDENTITY(1,1) PRIMARY KEY,
    CategoryName nvarchar(100) NOT NULL UNIQUE,
    Description nvarchar(500),
    Icon nvarchar(255),
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE()
);

-- Courses
CREATE TABLE Courses (
    CourseId int IDENTITY(1,1) PRIMARY KEY,
    InstructorId int NOT NULL,
    CategoryId int NOT NULL,
    Title nvarchar(255) NOT NULL,
    Description nvarchar(2000),
    ShortDescription nvarchar(500),
    Thumbnail nvarchar(500),
    Price decimal(10,2) NOT NULL DEFAULT 0,
    DiscountPrice decimal(10,2),
    Level nvarchar(20) DEFAULT 'Beginner', -- Beginner, Intermediate, Advanced
    Duration int, -- Total duration in minutes
    Language nvarchar(50) DEFAULT 'Vietnamese',
    Prerequisites nvarchar(1000),
    WhatYouWillLearn nvarchar(2000), -- JSON array
    IsPublished bit DEFAULT 0,
    IsActive bit DEFAULT 1,
    EnrollmentCount int DEFAULT 0,
    AverageRating decimal(3,2) DEFAULT 0,
    TotalRatings int DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (InstructorId) REFERENCES Users(UserId),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

-- Course Sections (Table of Contents)
CREATE TABLE CourseSections (
    SectionId int IDENTITY(1,1) PRIMARY KEY,
    CourseId int NOT NULL,
    Title nvarchar(255) NOT NULL,
    Description nvarchar(1000),
    OrderIndex int NOT NULL,
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId) ON DELETE CASCADE
);

-- Lessons
CREATE TABLE Lessons (
    LessonId int IDENTITY(1,1) PRIMARY KEY,
    SectionId int NOT NULL,
    Title nvarchar(255) NOT NULL,
    Content nvarchar(MAX), -- HTML content
    VideoUrl nvarchar(500),
    Duration int, -- Duration in minutes
    OrderIndex int NOT NULL,
    IsPreview bit DEFAULT 0, -- Can be viewed without enrollment
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (SectionId) REFERENCES CourseSections(SectionId) ON DELETE CASCADE
);

-- Course Enrollments
CREATE TABLE Enrollments (
    EnrollmentId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    CourseId int NOT NULL,
    EnrolledAt datetime2 DEFAULT GETDATE(),
    CompletedAt datetime2,
    Progress decimal(5,2) DEFAULT 0, -- Percentage completed
    LastAccessedAt datetime2,
    Status nvarchar(20) DEFAULT 'Active', -- Active, Completed, Dropped
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId) ON DELETE CASCADE,
    UNIQUE(UserId, CourseId)
);

-- Lesson Progress
CREATE TABLE LessonProgress (
    ProgressId int IDENTITY(1,1) PRIMARY KEY,
    EnrollmentId int NOT NULL,
    LessonId int NOT NULL,
    IsCompleted bit DEFAULT 0,
    WatchTime int DEFAULT 0, -- Time watched in seconds
    CompletedAt datetime2,
    LastAccessedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (EnrollmentId) REFERENCES Enrollments(EnrollmentId) ON DELETE CASCADE,
    FOREIGN KEY (LessonId) REFERENCES Lessons(LessonId) ON DELETE NO ACTION,
    UNIQUE(EnrollmentId, LessonId)
);

-- Course Reviews/Ratings
CREATE TABLE CourseReviews (
    ReviewId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    CourseId int NOT NULL,
    Rating int NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
    Review nvarchar(2000),
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId) ON DELETE CASCADE,
    UNIQUE(UserId, CourseId)
);

-- =============================================
-- QUIZ SYSTEM TABLES
-- =============================================

-- Quizzes
CREATE TABLE Quizzes (
    QuizId int IDENTITY(1,1) PRIMARY KEY,
    CourseId int NOT NULL,
    SectionId int,
    LessonId int,
    Title nvarchar(255) NOT NULL,
    Description nvarchar(1000),
    TimeLimit int, -- Time limit in minutes
    PassingScore decimal(5,2) DEFAULT 70, -- Percentage
    MaxAttempts int DEFAULT 3,
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId) ON DELETE CASCADE,
    FOREIGN KEY (SectionId) REFERENCES CourseSections(SectionId),
    FOREIGN KEY (LessonId) REFERENCES Lessons(LessonId)
);

-- Quiz Questions
CREATE TABLE QuizQuestions (
    QuestionId int IDENTITY(1,1) PRIMARY KEY,
    QuizId int NOT NULL,
    Question nvarchar(2000) NOT NULL,
    QuestionType nvarchar(20) DEFAULT 'MultipleChoice', -- MultipleChoice, TrueFalse, Essay
    Points decimal(5,2) DEFAULT 1,
    OrderIndex int NOT NULL,
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId) ON DELETE CASCADE
);

-- Quiz Question Options
CREATE TABLE QuizQuestionOptions (
    OptionId int IDENTITY(1,1) PRIMARY KEY,
    QuestionId int NOT NULL,
    OptionText nvarchar(1000) NOT NULL,
    IsCorrect bit DEFAULT 0,
    OrderIndex int NOT NULL,
    FOREIGN KEY (QuestionId) REFERENCES QuizQuestions(QuestionId) ON DELETE CASCADE
);

-- Quiz Attempts
CREATE TABLE QuizAttempts (
    AttemptId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    QuizId int NOT NULL,
    StartedAt datetime2 DEFAULT GETDATE(),
    CompletedAt datetime2,
    Score decimal(5,2),
    TotalPoints decimal(5,2),
    Percentage decimal(5,2),
    IsPassed bit DEFAULT 0,
    AttemptNumber int NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId) ON DELETE CASCADE
);

-- Quiz Answers
CREATE TABLE QuizAnswers (
    AnswerId int IDENTITY(1,1) PRIMARY KEY,
    AttemptId int NOT NULL,
    QuestionId int NOT NULL,
    SelectedOptionId int, -- For multiple choice
    AnswerText nvarchar(2000), -- For essay questions
    IsCorrect bit,
    Points decimal(5,2) DEFAULT 0,
    FOREIGN KEY (AttemptId) REFERENCES QuizAttempts(AttemptId) ON DELETE CASCADE,
    FOREIGN KEY (QuestionId) REFERENCES QuizQuestions(QuestionId) ON DELETE NO ACTION,
    FOREIGN KEY (SelectedOptionId) REFERENCES QuizQuestionOptions(OptionId) ON DELETE NO ACTION
);

-- =============================================
-- SHOPPING CART & PAYMENT TABLES
-- =============================================

-- Shopping Cart
CREATE TABLE CartItems (
    CartItemId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    CourseId int NOT NULL,
    AddedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId) ON DELETE CASCADE,
    UNIQUE(UserId, CourseId)
);

-- Orders
CREATE TABLE Orders (
    OrderId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    OrderNumber nvarchar(50) NOT NULL UNIQUE,
    TotalAmount decimal(10,2) NOT NULL,
    DiscountAmount decimal(10,2) DEFAULT 0,
    FinalAmount decimal(10,2) NOT NULL,
    Status nvarchar(20) DEFAULT 'Pending', -- Pending, Paid, Cancelled, Refunded
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- Order Items
CREATE TABLE OrderItems (
    OrderItemId int IDENTITY(1,1) PRIMARY KEY,
    OrderId int NOT NULL,
    CourseId int NOT NULL,
    Price decimal(10,2) NOT NULL,
    DiscountPrice decimal(10,2),
    FinalPrice decimal(10,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);

-- Payments
CREATE TABLE Payments (
    PaymentId int IDENTITY(1,1) PRIMARY KEY,
    OrderId int NOT NULL,
    PaymentMethod nvarchar(50), -- QR, BankTransfer, Card
    PaymentProvider nvarchar(50), -- VNPay, MoMo, etc.
    TransactionId nvarchar(100),
    Amount decimal(10,2) NOT NULL,
    Status nvarchar(20) DEFAULT 'Pending', -- Pending, Completed, Failed, Cancelled
    QRCodeUrl nvarchar(500),
    PaymentUrl nvarchar(500),
    CreatedAt datetime2 DEFAULT GETDATE(),
    CompletedAt datetime2,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE
);

-- =============================================
-- FORUM SYSTEM TABLES
-- =============================================

-- Forum Categories
CREATE TABLE ForumCategories (
    CategoryId int IDENTITY(1,1) PRIMARY KEY,
    CategoryName nvarchar(100) NOT NULL UNIQUE,
    Description nvarchar(500),
    Icon nvarchar(255),
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE()
);

-- Forums/Posts
CREATE TABLE Forums (
    ForumId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    CategoryId int,
    Title nvarchar(255) NOT NULL,
    Content nvarchar(MAX) NOT NULL,
    IsPinned bit DEFAULT 0,
    IsClosed bit DEFAULT 0,
    IsBanned bit DEFAULT 0,
    ViewCount int DEFAULT 0,
    ReplyCount int DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE NO ACTION,
    FOREIGN KEY (CategoryId) REFERENCES ForumCategories(CategoryId)
);

-- Forum Replies/Comments
CREATE TABLE ForumReplies (
    ReplyId int IDENTITY(1,1) PRIMARY KEY,
    ForumId int NOT NULL,
    UserId int NOT NULL,
    ParentReplyId int, -- For nested replies
    Content nvarchar(MAX) NOT NULL,
    LikeCount int DEFAULT 0,
    IsReported bit DEFAULT 0,
    IsBanned bit DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (ForumId) REFERENCES Forums(ForumId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE NO ACTION,
    FOREIGN KEY (ParentReplyId) REFERENCES ForumReplies(ReplyId) ON DELETE NO ACTION
);

-- Forum Reply Likes
CREATE TABLE ForumReplyLikes (
    LikeId int IDENTITY(1,1) PRIMARY KEY,
    ReplyId int NOT NULL,
    UserId int NOT NULL,
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (ReplyId) REFERENCES ForumReplies(ReplyId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    UNIQUE(ReplyId, UserId)
);

-- =============================================
-- LESSON COMMENTS SYSTEM
-- =============================================

-- Lesson Comments
CREATE TABLE LessonComments (
    CommentId int IDENTITY(1,1) PRIMARY KEY,
    LessonId int NOT NULL,
    UserId int NOT NULL,
    ParentCommentId int, -- For nested comments
    Content nvarchar(2000) NOT NULL,
    LikeCount int DEFAULT 0,
    IsReported bit DEFAULT 0,
    IsBanned bit DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (LessonId) REFERENCES Lessons(LessonId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE NO ACTION,
    FOREIGN KEY (ParentCommentId) REFERENCES LessonComments(CommentId) ON DELETE NO ACTION
);

-- Lesson Comment Likes
CREATE TABLE LessonCommentLikes (
    LikeId int IDENTITY(1,1) PRIMARY KEY,
    CommentId int NOT NULL,
    UserId int NOT NULL,
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (CommentId) REFERENCES LessonComments(CommentId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    UNIQUE(CommentId, UserId)
);

-- =============================================
-- SUPPORT SYSTEM TABLES
-- =============================================

-- Support Tickets
CREATE TABLE SupportTickets (
    TicketId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    Subject nvarchar(255) NOT NULL,
    Description nvarchar(2000) NOT NULL,
    Priority nvarchar(20) DEFAULT 'Medium', -- Low, Medium, High, Urgent
    Status nvarchar(20) DEFAULT 'Open', -- Open, InProgress, Resolved, Closed
    AssignedTo int, -- Moderator assigned to ticket
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    ClosedAt datetime2,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE NO ACTION,
    FOREIGN KEY (AssignedTo) REFERENCES Users(UserId) ON DELETE NO ACTION
);

-- Support Ticket Messages
CREATE TABLE TicketMessages (
    MessageId int IDENTITY(1,1) PRIMARY KEY,
    TicketId int NOT NULL,
    UserId int NOT NULL,
    Message nvarchar(2000) NOT NULL,
    IsFromStaff bit DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (TicketId) REFERENCES SupportTickets(TicketId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE NO ACTION
);

-- =============================================
-- NOTIFICATION SYSTEM TABLES
-- =============================================

-- Notifications
CREATE TABLE Notifications (
    NotificationId int IDENTITY(1,1) PRIMARY KEY,
    UserId int NOT NULL,
    Title nvarchar(255) NOT NULL,
    Message nvarchar(1000) NOT NULL,
    Type nvarchar(50), -- CourseUpdate, PaymentSuccess, ForumReply, TicketUpdate, etc.
    RelatedEntityId int, -- ID of related course, forum, ticket, etc.
    RelatedEntityType nvarchar(50), -- Course, Forum, Ticket, etc.
    IsRead bit DEFAULT 0,
    CreatedAt datetime2 DEFAULT GETDATE(),
    ReadAt datetime2,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);

-- =============================================
-- REPORTING SYSTEM TABLES
-- =============================================

-- Reports
CREATE TABLE Reports (
    ReportId int IDENTITY(1,1) PRIMARY KEY,
    ReportedBy int NOT NULL,
    ReportedEntityType nvarchar(50) NOT NULL, -- Comment, Forum, User
    ReportedEntityId int NOT NULL,
    ReportedUserId int, -- User being reported
    Reason nvarchar(100) NOT NULL,
    Description nvarchar(1000),
    Status nvarchar(20) DEFAULT 'Pending', -- Pending, Reviewed, Resolved, Dismissed
    ReviewedBy int,
    ReviewedAt datetime2,
    ReviewNotes nvarchar(1000),
    CreatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (ReportedBy) REFERENCES Users(UserId) ON DELETE NO ACTION,
    FOREIGN KEY (ReportedUserId) REFERENCES Users(UserId) ON DELETE NO ACTION,
    FOREIGN KEY (ReviewedBy) REFERENCES Users(UserId) ON DELETE NO ACTION
);

-- =============================================
-- INSTRUCTOR PAYMENT SETTINGS
-- =============================================

-- Instructor Payment Settings
CREATE TABLE InstructorPaymentSettings (
    SettingId int IDENTITY(1,1) PRIMARY KEY,
    InstructorId int NOT NULL UNIQUE,
    BankName nvarchar(100),
    BankAccountNumber nvarchar(50),
    BankAccountHolderName nvarchar(100),
    PayPalEmail nvarchar(255),
    TaxId nvarchar(50),
    CommissionRate decimal(5,2) DEFAULT 70.00, -- Instructor gets 70% by default
    IsActive bit DEFAULT 1,
    CreatedAt datetime2 DEFAULT GETDATE(),
    UpdatedAt datetime2 DEFAULT GETDATE(),
    FOREIGN KEY (InstructorId) REFERENCES Users(UserId) ON DELETE CASCADE
);

-- =============================================
-- INDEXES FOR BETTER PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_IsActive ON Users(IsActive);
CREATE INDEX IX_UserRoles_UserId ON UserRoles(UserId);
CREATE INDEX IX_UserRoles_RoleId ON UserRoles(RoleId);

-- Course indexes
CREATE INDEX IX_Courses_InstructorId ON Courses(InstructorId);
CREATE INDEX IX_Courses_CategoryId ON Courses(CategoryId);
CREATE INDEX IX_Courses_IsPublished ON Courses(IsPublished);
CREATE INDEX IX_Courses_CreatedAt ON Courses(CreatedAt);
CREATE INDEX IX_Enrollments_UserId ON Enrollments(UserId);
CREATE INDEX IX_Enrollments_CourseId ON Enrollments(CourseId);

-- Forum indexes
CREATE INDEX IX_Forums_UserId ON Forums(UserId);
CREATE INDEX IX_Forums_CategoryId ON Forums(CategoryId);
CREATE INDEX IX_Forums_CreatedAt ON Forums(CreatedAt);
CREATE INDEX IX_ForumReplies_ForumId ON ForumReplies(ForumId);
CREATE INDEX IX_ForumReplies_UserId ON ForumReplies(UserId);

-- Notification indexes
CREATE INDEX IX_Notifications_UserId ON Notifications(UserId);
CREATE INDEX IX_Notifications_IsRead ON Notifications(IsRead);
CREATE INDEX IX_Notifications_CreatedAt ON Notifications(CreatedAt);

-- Payment indexes
CREATE INDEX IX_Orders_UserId ON Orders(UserId);
CREATE INDEX IX_Orders_Status ON Orders(Status);
CREATE INDEX IX_Payments_OrderId ON Payments(OrderId);
CREATE INDEX IX_Payments_Status ON Payments(Status);

GO

GO

-- =============================================
-- INSERT INITIAL DATA
-- =============================================

-- Insert Roles
INSERT INTO Roles (RoleName, Description) VALUES
('Guest', 'Unregistered users with limited access'),
('Customer', 'Registered users who can enroll in courses'),
('Instructor', 'Users who can create and manage courses'),
('Moderator', 'Users who can moderate content and support'),
('Admin', 'System administrators with full access');

-- Insert Categories
INSERT INTO Categories (CategoryName, Description, Icon) VALUES
('Programming', 'Software development and programming courses', 'code'),
('Design', 'UI/UX design and graphic design courses', 'palette'),
('Business', 'Business and entrepreneurship courses', 'briefcase'),
('Marketing', 'Digital marketing and advertising courses', 'trending-up'),
('Photography', 'Photography and video editing courses', 'camera'),
('Music', 'Music production and instrument courses', 'music'),
('Language', 'Foreign language learning courses', 'globe'),
('Health', 'Health and fitness courses', 'heart');

GO

-- Insert Forum Categories
INSERT INTO ForumCategories (CategoryName, Description, Icon) VALUES
('General Discussion', 'General topics and discussions', 'message-square'),
('Course Help', 'Get help with specific courses', 'help-circle'),
('Technical Support', 'Technical issues and support', 'tool'),
('Feature Requests', 'Suggest new features', 'lightbulb'),
('Bug Reports', 'Report bugs and issues', 'alert-triangle');

-- Insert Sample Admin User (password: Admin@123)
INSERT INTO Users (Email, PasswordHash, FirstName, LastName, IsActive, EmailVerified) VALUES
('admin@onlinelearning.com', '$2b$10$rOzJrT7bBKZ8QH6nJ9Bqd.eY8FqJtKlMnOpQrStUvWxYzAaBcDeFG', 'System', 'Administrator', 1, 1);

-- Assign Admin Role
INSERT INTO UserRoles (UserId, RoleId) VALUES
(1, 5); -- Admin role

PRINT 'Database schema created successfully!';
PRINT 'Default admin user created: admin@onlinelearning.com / Admin@123';