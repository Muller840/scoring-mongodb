document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = {
        ciCliente: document.getElementById('ciCliente').value,
        nombre: document.getElementById('nombre').value,
        // Otros campos
    };

    fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }).then(response => response.json())
      .then(data => {
          alert('Cliente registrado con éxito');
          console.log(data);
      }).catch(error => console.error('Error:', error));
});
