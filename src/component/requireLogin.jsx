import Swal from "sweetalert2";

const requireLogin = () => {
    Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để tiếp tục.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/login";
        }
    });
};
