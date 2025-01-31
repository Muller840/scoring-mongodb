document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = {
        ciCliente: document.getElementById('ciCliente').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        salario: parseFloat(document.getElementById('salario').value),
        estadoCivil: document.getElementById('estadoCivil').value,
        nombreConyuge: document.getElementById('nombreConyuge').value || '',
        salarioConyuge: parseFloat(document.getElementById('salarioConyuge').value) || 0
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
          actualizarListaClientes(data);
      }).catch(error => console.error('Error:', error));
});

function toggleConyugeFields() {
    const estadoCivil = document.getElementById('estadoCivil').value;
    const conyugeFields = document.getElementById('conyugeFields');
    if (estadoCivil === 'casado') {
        conyugeFields.style.display = 'block';
    } else {
        conyugeFields.style.display = 'none';
        document.getElementById('nombreConyuge').value = '';
        document.getElementById('salarioConyuge').value = '';
    }
}

function actualizarListaClientes(cliente) {
    const listaClientes = document.getElementById('listaClientes');
    const clienteElemento = document.createElement('div');
    clienteElemento.classList.add('card');
    clienteElemento.innerHTML = `
        <h5>${cliente.nombre} ${cliente.apellido}</h5>
        <p><strong>CI:</strong> ${cliente.ciCliente}</p>
        <p><strong>Email:</strong> ${cliente.email}</p>
        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
        <p><strong>Salario:</strong> Gs ${cliente.salario.toLocaleString()}</p>
        <p><strong>Estado Civil:</strong> ${cliente.estadoCivil}</p>
        ${cliente.estadoCivil === 'casado' ? `
        <p><strong>Nombre del Cónyuge:</strong> ${cliente.nombreConyuge}</p>
        <p><strong>Salario del Cónyuge:</strong> Gs ${cliente.salarioConyuge.toLocaleString()}</p>
        ` : ''}
    `;
    listaClientes.appendChild(clienteElemento);
}
