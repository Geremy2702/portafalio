let sidebar_navigation = document.getElementById('sidebar_navigation');

let sidebar_navigation_bottom = document.getElementById('sidebar_buttom_menu');

sidebar_navigation_bottom.addEventListener('click', function () {
    if (sidebar_navigation.style.left == "" || sidebar_navigation.style.left == "-100%") {
        sidebar_navigation.style.left = "0"
        document.getElementById('sidebar_menu_icon').classList.add('fa-close');
    }
    else {
        sidebar_navigation.style.left = "-100%"
        document.getElementById('sidebar_menu_icon').classList.remove('fa-close');
    }
})


let global_menu_buttom = document.getElementById('global_menu_button')
let global_navigation = document.getElementById('global_menu_items')
let global_close_buttom = document.getElementById('global_menu_close_button')

global_menu_buttom.addEventListener('click', function () {
    global_navigation.style.left = "0";
})

global_close_buttom.addEventListener('click', function () {
    global_navigation.style.left = "-120%";
})

//*CONEXION CON BASE DE DATOS PHP**//

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        fetch('controller.php', {
            method: 'POST',
            body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, celular: celular, 
                asunto: asunto, mensaje: mensaje })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userList.innerHTML = '';
                fetchUsers();
                form.reset();
            } else {
                alert('Error al agregar usuario.');
            }
        });
    });

    function fetchUsers() {
        fetch('controller.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const userItem = document.createElement('div');
                userItem.innerHTML = `<strong>${user.nombre}</strong> - ${user.apellido}`;
                userList.appendChild(userItem);
            });
        });
    }

    fetchUsers();
});
