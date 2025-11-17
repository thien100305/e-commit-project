document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessageEl = document.getElementById('error-message');

    // --- XỬ LÝ FORM ĐĂNG NHẬP ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Ngăn form submit theo cách truyền thống

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Gọi API do Dev 2 (Backend) cung cấp
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (response.ok) {
                    // Đăng nhập thành công
                    localStorage.setItem('token', result.token); // Lưu token
                    localStorage.setItem('user', JSON.stringify(result.user));
                    alert('Đăng nhập thành công!');
                    window.location.href = '/'; // Chuyển về trang chủ
                } else {
                    // Đăng nhập thất bại
                    errorMessageEl.textContent = result.message || 'Lỗi không xác định';
                    errorMessageEl.style.display = 'block';
                }
            } catch (err) {
                console.error('Lỗi khi đăng nhập:', err);
                errorMessageEl.textContent = 'Không thể kết nối tới server.';
                errorMessageEl.style.display = 'block';
            }
        });
    }

    // --- XỬ LÝ FORM ĐĂNG KÝ ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                errorMessageEl.textContent = 'Mật khẩu xác nhận không khớp!';
                errorMessageEl.style.display = 'block';
                return; // Dừng lại nếu mật khẩu không khớp
            }

            try {
                // Gọi API do Dev 2 (Backend) cung cấp
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const result = await response.json();

                if (response.ok) {
                    // Đăng ký thành công
                    alert('Đăng ký thành công! Vui lòng đăng nhập.');
                    window.location.href = '/login'; // Chuyển về trang đăng nhập
                } else {
                    // Đăng ký thất bại
                    errorMessageEl.textContent = result.message || 'Lỗi không xác định';
                    errorMessageEl.style.display = 'block';
                }
            } catch (err) {
                console.error('Lỗi khi đăng ký:', err);
                errorMessageEl.textContent = 'Không thể kết nối tới server.';
                errorMessageEl.style.display = 'block';
            }
        });
    }
});