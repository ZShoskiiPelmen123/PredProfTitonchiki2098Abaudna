//document.getElementById("main_btn").addEventListener("click", () => {
//    document.getElementById("overlay").classList.remove("hidden");
//    document.getElementById("selectModal").classList.remove("hidden");
//    document.getElementById("selectModal").style.display = "flex";
//});
//document.getElementById("LogBtnAdmin").addEventListener("click", () => {
//    document.getElementById("overlay").classList.remove("hidden");
//    document.getElementById("loginModal").classList.remove("hidden");
//    document.getElementById("loginModal").style.display = "flex";
//    document.getElementById("selectModal").classList.add("hidden");
//    document.getElementById("selectModal").style.display = "none";
//});
//document.getElementById("LogBtnPupil").addEventListener("click", () => {
//    document.getElementById("overlay").classList.remove("hidden");
//    document.getElementById("loginModal").classList.remove("hidden");
//    document.getElementById("loginModal").style.display = "flex";
//    document.getElementById("selectModal").classList.add("hidden");
//    document.getElementById("selectModal").style.display = "none";
//});
//document.getElementById("closeLogin").addEventListener("click", () => {
//    document.getElementById("overlay").classList.add("hidden");
//    document.getElementById("loginModal").classList.add("hidden");
//    document.getElementById("loginModal").style.display = "none";
//});
//document.getElementById("closeSelect").addEventListener("click", () => {
//    document.getElementById("overlay").classList.add("hidden");
//    document.getElementById("selectModal").classList.add("hidden");
//    document.getElementById("selectModal").style.display = "none";
//});
//
//
//
//
//     Функционал открытия и закрытия модальных окон
document.getElementById("loginBtn").addEventListener("click", () => {
        document.getElementById("overlay").style.display = "block";
});

    document.getElementById("registerBtn").addEventListener("click", () =>  {
        document.getElementById("registerOverlay").style.display = "block";
    })

    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
        clearErrors(modalId);
    }

    function clearErrors(modalId) {
        const errors = document.querySelectorAll({modalId} .error);
        errors.forEach(error => error.style.display = "none");
    }

    document.querySelectorAll(".close").forEach(function (closeButton) {
        closeButton.onclick = function () {
            closeModal(closeButton.closest('.modal').id);
        };
    });

window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    };

    // Вход администратора
    document.getElementById("adminLoginBtn").onclick = function () {
        openModal("adminPanel");
        closeModal("overlay");
    }

    // Вход пользователя
    document.getElementById("userLoginBtn").onclick = function () {
        openModal("userPanel");
        closeModal("overlay");
    }

    // Регистрация как учитель
    document.getElementById("teacherRegisterBtn").onclick = function () {
        openModal("teacherPanel");
        closeModal("registerOverlay");
    }

    // Регистрация как ученик
    document.getElementById("studentRegisterBtn").onclick = function () {
        openModal("studentPanel");
        closeModal("registerOverlay");
    }

//    // Обработка входа администратора
//    document.getElementById("adminSubmitBtn").onclick = function () {
//        const nickname = document.getElementById("adminNickname").value;
//        const password = document.getElementById("adminPassword").value;
//        const key = document.getElementById("adminKey").value;
//        let isValid = true;
//
//        if (nickname === "") {
//            document.getElementById("adminNicknameError").style.display = "block";
//            isValid = false;
//        }
//        if (password === "") {
//            document.getElementById("adminPasswordError").style.display = "block";
//            isValid = false;
//        }
//        if (key === "") {
//            document.getElementById("adminKeyError").style.display = "block";
//            isValid = false;
//        }
//
//        if (isValid) {
//            closeModal("adminPanel");
//            document.getElementById("successMessage").style.display = "block";
//        }
//    }

//    // Обработка входа пользователя
//    document.getElementById("studentSubmitBtn").onclick = function () {
//        const nick = document.getElementById("studentNick").value;
//        const password = document.getElementById("studentPassword").value;
//        let isValid = true;
//
//        if (nick === "") {
//            document.getElementById("studentNickError").style.display = "block";
//            isValid = false;
//        }
//        if (password === "") {
//            document.getElementById("studentPasswordError").style.display = "block";
//            isValid = false;
//        }
//
//        if (isValid) {
//            closeModal("studentPanel");
//            document.getElementById("successMessage").style.display = "block";
//        }
//    }

//    // Обработка регистрации учителя
//    document.getElementById("teacherSubmitBtn").onclick = function () {
//        const nick = document.getElementById("teacherNick").value;
//        const name = document.getElementById("teacherName").value;
//        const lastname = document.getElementById("teacherLastname").value;
//        const password = document.getElementById("teacherPassword").value;
//        const key = document.getElementById("teacherKey").value;
//        let isValid = true;
//
//        if (nick === "") {
//            document.getElementById("teacherNickError").style.display = "block";
//            isValid = false;
//        }
//        if (name === "") {
//            document.getElementById("teacherNameError").style.display = "block";
//            isValid = false;
//        }
//        if (lastname === "") {
//            document.getElementById("teacherLastnameError").style.display = "block";
//            isValid = false;
//        }
//        if (password === "") {
//            document.getElementById("teacherPasswordError").style.display = "block";
//            isValid = false;
//        }
//        if (key === "") {
//            document.getElementById("teacherKeyError").style.display = "block";
//            isValid = false;
//        }
//
//        if (isValid) {
//            closeModal("teacherPanel");
//            document.getElementById("successMessage").style.display = "block";
//        }
//    }
    function fun(e){
        e.preventDefault()
        window.location.href="/admin"
    }


       let editingRow = null;

            document.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    addItem();
                }
            });

            function addItem() {
                const itemName = document.getElementById("itemName").value;
                const itemQuantity = document.getElementById("itemQuantity").value;
                const itemStatus = document.getElementById("itemStatus").value;

                if (itemName && itemQuantity && itemStatus) {
                    const tableBody = document.getElementById("inventoryTableBody");
                    const newRow = document.createElement("tr");

                    newRow.innerHTML = `
                        <td>${itemName}</td>
                        <td>${itemQuantity}</td>
                        <td>${itemStatus}</td>
                        <td>
                            <button class="shine-button" onclick="editItem(this)">Редактировать</button>
                            <button class="shine-button delete-button" onclick="removeItem(this)">Удалить</button>
                        </td>
                    `;

                    tableBody.appendChild(newRow);
                    $.ajax({
                        url: '/inventory',
                        data: JSON.stringify({name: itemName, amount: itemQuantity, status: itemStatus}),
                        datatype: JSON,
                        contentType: 'application/json;charset=UTF-8',
                        method: 'post',
                        success: function (res) {
                        }
                    });
                    clearInputs();
                } else {
                    alert("Пожалуйста, заполните все поля.");
                }
            }

            function editItem(button) {
                const row = button.parentElement.parentElement;
                const itemName = row.cells[0].innerText;
                const itemQuantity = row.cells[1].innerText;
                const itemStatus = row.cells[2].innerText;

                document.getElementById("itemName").value = itemName;
                document.getElementById("itemQuantity").value = itemQuantity;
                document.getElementById("itemStatus").value = itemStatus;

                editingRow = row;

                button.innerText = "Сохранить";
                button.onclick = function () {
                    saveItem(button);
                };
            }

            function saveItem(button) {
                if (editingRow) {
                    editingRow.cells[0].innerText = document.getElementById("itemName").value;
                    editingRow.cells[1].innerText = document.getElementById("itemQuantity").value;
                    editingRow.cells[2].innerText = document.getElementById("itemStatus").value;

                    clearInputs();

                    button.innerText = "Редактировать";
                    button.onclick = function () {
                        editItem(button);
                    };

                    editingRow = null;
                }
            }

            function removeItem(button) {
                const row = button.parentElement.parentElement;
                $.ajax({
                    url: '/inventory',
                    data: JSON.stringify({objectId: $(row).data("objectid")}),
                    datatype: JSON,
                    contentType: 'application/json;charset=UTF-8',
                    method: 'delete',
                    success: function (res) {
                    }
                });
                row.parentElement.removeChild(row);
            }

            function clearInputs() {
                document.getElementById("itemName").value = '';
                document.getElementById("itemQuantity").value = '';
                document.getElementById("itemStatus").value = '';
            }





        document.getElementById('purchase-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const itemName = document.getElementById('item-name').value;
            const quantity = document.getElementById('quantity').value;
            const price = document.getElementById('price').value;
            const supplier = document.getElementById('supplier').value;
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${itemName}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${supplier}</td>
                <td>
                    <button onclick="approveRow(this)">Одобрить</button>
                    <button onclick="removeRow(this)">Удалить</button>
                </td>
            `;
            document.querySelector('#purchase-plan tbody').appendChild(tableRow);
            document.getElementById('purchase-form').reset();
        });

        function removeRow(button) {
            const row = button.parentElement.parentElement;
            row.parentElement.removeChild(row);
        }

        function approveRow(button) {
            const row = button.parentElement.parentElement;
            row.style.backgroundColor = "#d4edda";
            button.innerText = "Одобрено";
            button.disabled = true;
        }