document.addEventListener('DOMContentLoaded', () => {

    // --- XỬ LÝ NÚT "THÊM VÀO GIỎ HÀNG" ---
    const addBtn = document.getElementById('add-to-cart-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', async () => {
            const gameId = addBtn.dataset.gameId; // Lấy gameId từ data-
            
            // Lấy token (nếu user đã đăng nhập)
            const token = localStorage.getItem('token');
            
            // 1. Kiểm tra xem user đã đăng nhập chưa
            if (!token) {
                alert('Bạn cần đăng nhập để thêm vào giỏ hàng!');
                window.location.href = '/login'; // Chuyển đến trang login
                return;
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

    // --- XỬ LÝ TAB MÔ TẢ ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab;

            // Xóa active khỏi tất cả link và content
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));

            // Thêm active cho link và content được chọn
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});