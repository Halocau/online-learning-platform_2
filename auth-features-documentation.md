# Authentication Features Documentation

## 3.3.1 Authentication System

### 3.3.1.3 Login Form

#### Đăng nhập

**This screen allows users to:**
- **User Authentication:** login to access their account
- **Account Recovery:** recover password when forgotten
- **Social Login:** quick login via Google
- **New User Registration:** redirect to account registration

#### Form Layout:

```
        [📚 Logo]
        
        Login
Enter your login information to access your account

Email:
[📧 example@domain.com                           ]

Password:
[🔒 Enter password                              👁️]

☐ Remember login                        Forgot password?

[              Login              ]

[G  Login with Google]

Don't have an account? Sign up now
```

#### Field Description:

| **Field Name** | **Description** |
|----------------|-----------------|
| **Email** | Data type: email format, required field |
| **Password** | Data type: password string, required field with show/hide toggle |
| **Remember login** | Checkbox: save login session |
| **Forgot password?** | Link: redirect to password recovery page |

#### Action Buttons:
- **Login:** Submit form with validation
- **Login with Google:** OAuth authentication
- **Sign up now:** Redirect to registration page

#### Validation Rules:
- Email must be in correct email format
- Password is a required field
- Display error if information is incorrect

---

### 3.3.1.4 Registration Form

#### Đăng ký tài khoản

**This screen allows users to:**
- **Create New Account:** register new user account to start learning journey
- **User Information Collection:** gather basic user details for profile setup
- **Account Verification:** establish secure login credentials
- **Social Registration:** quick signup via Google

#### Form Layout:

```
        [📚 Logo]
        
        Đăng ký tài khoản
    Tạo tài khoản mới để bắt đầu hành trình học tập

Họ                              Tên
[👤 Nguyễn                ]    [Văn A                    ]

Email
[📧 example@domain.com                                   ]

Số điện thoại
[📱 0123456789                                          ]

Vai trò
[Chọn vai trò của bạn                                   ▼]

Mật khẩu
[🔒 Tối thiểu 8 ký tự                                  👁️]

Xác nhận mật khẩu
[🔒 Nhập lại mật khẩu                                  👁️]

☐ Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật
☐ Nhận thông báo về khóa học mới và ưu đãi đặc biệt

[                Tạo tài khoản                ]

[G  Đăng ký với Google]

Đã có tài khoản? Đăng nhập ngay

© 2024 EduPlatform. Tất cả quyền được bảo lưu.
```

#### Field Description:

| **Field Name** | **Description** |
|----------------|-----------------|
| **Họ** | Data type: string, required field for first name |
| **Tên** | Data type: string, required field for last name |
| **Email** | Data type: email format, required field, must be unique |
| **Số điện thoại** | Data type: phone number format, required field |
| **Vai trò** | Dropdown: select user role (Student/Instructor) |
| **Mật khẩu** | Data type: password string, minimum 8 characters, with show/hide toggle |
| **Xác nhận mật khẩu** | Data type: password string, must match password field |

#### Action Elements:
- **Terms & Privacy Checkbox:** Required agreement to terms of service and privacy policy
- **Marketing Checkbox:** Optional newsletter and promotional updates
- **Tạo tài khoản:** Submit registration form with validation
- **Đăng ký với Google:** OAuth registration
- **Đăng nhập ngay:** Redirect to login page for existing users

#### Validation Rules:
- All fields except marketing checkbox are required
- Email must be valid format and unique in system
- Password must be minimum 8 characters
- Confirm password must match original password
- Phone number must be valid format
- Terms agreement is mandatory

---

### 3.3.1.5 Forgot Password Form

#### Quên mật khẩu?

**This screen allows users to:**
- **Password Recovery:** initiate password reset process for forgotten passwords
- **Email Verification:** verify account ownership through registered email
- **Navigation Control:** return to login screen if needed

#### Form Layout:

```
        [✉️ Logo]
        
        Quên mật khẩu?
Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu

Email
[📧 example@domain.com                                   ]

⚠️ Hãy đảm bảo rằng đây là email bạn đã sử dụng để đăng ký tài khoản.

[            Gửi hướng dẫn đặt lại            ]

← Quay lại đăng nhập
```

#### Field Description:

| **Field Name** | **Description** |
|----------------|-----------------|
| **Email** | Data type: email format, required field - must match registered email |

#### Action Elements:
- **Gửi hướng dẫn đặt lại:** Submit email for password reset instructions
- **Quay lại đăng nhập:** Navigate back to login page

#### Validation Rules:
- Email field is required
- Email must be in valid format
- System will send reset instructions to registered email only
- Warning message reminds users to use registration email

#### User Flow:
1. User enters registered email address
2. System validates email format and existence
3. Reset instructions sent to email
4. User can return to login page via back link

#### Security Features:
- Email verification ensures account ownership
- Reset link sent only to registered email address
- Clear instruction about using registration email

---

## Summary

These three authentication screens provide a complete user authentication system for the online learning platform:

1. **Login Form:** Secure user authentication with social login options
2. **Registration Form:** Comprehensive user onboarding with role selection
3. **Forgot Password Form:** Secure password recovery mechanism

All forms include proper validation, security measures, and user-friendly navigation between different authentication states.