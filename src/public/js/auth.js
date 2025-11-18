document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form-modal');
    const registerForm = document.getElementById('register-form-modal');
    const errorMessageEl = document.getElementById('auth-error-message');

    // --- XỬ LÝ FORM ĐĂNG NHẬP (TRONG MODAL) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Ngăn form submit
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
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
                    window.location.reload(); // Tải lại trang để cập nhật header
                } else {
                    // Đăng nhập thất bại
                    errorMessageEl.textContent = result.message || 'Lỗi không xác định';
                }
            } catch (err) {
                console.error('Lỗi khi đăng nhập:', err);
                errorMessageEl.textContent = 'Không thể kết nối tới server.';
            }
        });
    }

    // --- XỬ LÝ FORM ĐĂNG KÝ (TRONG MODAL) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

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
                    alert('Đăng ký thành công! Vui lòng chuyển qua tab Đăng nhập.');
                    // Tự động chuyển tab
                    document.querySelector('.auth-tab-link[data-tab="login"]').click();
                } else {
                    // Đăng ký thất bại
                    errorMessageEl.textContent = result.message || 'Lỗi không xác định';
                }
            } catch (err) {
                console.error('Lỗi khi đăng ký:', err);
                errorMessageEl.textContent = 'Không thể kết nối tới server.';
            }
        });
    }
});