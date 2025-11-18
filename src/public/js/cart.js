document.addEventListener('DOMContentLoaded', () => {

    // --- XỬ LÝ NÚT "THÊM VÀO GIỎ HÀNG" TRANG CHI TIẾT ---
    const addBtn = document.getElementById('add-to-cart-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', async () => {
            const gameId = addBtn.dataset.gameId; // Lấy gameId từ data-
            
            // Lấy token (nếu user đã đăng nhập)
            const token = localStorage.getItem('token');
            
            // 1. Kiểm tra xem user đã đăng nhập chưa
            if (!token) {
                // Nếu chưa, mở popup đăng nhập
                const authModal = document.getElementById('auth-modal-overlay');
                if (authModal) {
                    authModal.classList.add('show');
                }
                return; // Dừng lại
            }

            try {
                // 2. Gọi API của Dev 3 (Backend)
                // API này CẦN PHẢI được bảo vệ (yêu cầu token)
                const response = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Gửi token đi để backend biết bạn là ai
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify({ 
                        gameId: gameId, 
                        quantity: 1 
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    // 3. Thông báo thành công
                    alert('Đã thêm sản phẩm vào giỏ hàng!');
                    // (Nâng cao: Cập nhật icon giỏ hàng trên header)
                } else {
                    // 4. Thông báo lỗi từ server
                    alert(result.message || 'Thêm vào giỏ hàng thất bại.');
                }

            } catch (err) {
                console.error('Lỗi khi thêm vào giỏ hàng:', err);
                alert('Lỗi kết nối. Không thể thêm vào giỏ hàng.');
            }
        });
    }

    // --- XỬ LÝ CHỌN PHIÊN BẢN (TRANG CHI TIẾT) ---
    const versionButtons = document.querySelectorAll('.version-btn');
    const mainPriceEl = document.querySelector('.main-price');

    if (versionButtons.length > 0 && mainPriceEl) {
        versionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Xóa active ở tất cả các nút
                versionButtons.forEach(btn => btn.classList.remove('active'));
                
                // Thêm active cho nút vừa click
                button.classList.add('active');
                
                // Cập nhật giá
                const newPrice = parseInt(button.dataset.price);
                mainPriceEl.textContent = newPrice.toLocaleString('vi-VN') + 'đ';
            });
        });
    }

});