function showContent() {
        element = document.getElementById("newPassword");
        check = document.getElementById("check");

        if (check.checked) {
            element.style.display='block';
        }
        else {
            element.style.display='none';
        }
    }