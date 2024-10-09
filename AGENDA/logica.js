document.addEventListener('DOMContentLoaded', function () {
    const contactList = document.getElementById('contactList');
    const form = document.getElementById('addContactForm');
    
   
    function fetchContacts() {
        fetch('http://www.raydelto.org/agenda.php')
            .then(response => response.json())
            .then(data => {
                contactList.innerHTML = ''; 
                data.forEach(contact => {
                    const listItem = document.createElement('li');
                    listItem.className = 'contact-item';
                    listItem.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                    contactList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching contacts:', error));
    }

    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const phone = document.getElementById('phone').value;

        const newContact = {
            nombre: name,
            apellido: surname,
            telefono: phone
        };

        fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => {
            if (response.ok) {
                alert('Contacto agregado exitosamente');
                form.reset();
                fetchContacts();
            } else {
                alert('Error al agregar contacto');
            }
        })
        .catch(error => console.error('Error adding contact:', error));
    });

    
    fetchContacts();
});