document.addEventListener("DOMContentLoaded", function() {
  // Espera a que el DOM esté completamente cargado antes de ejecutar el código
  
  // Obtener referencias a los elementos del DOM
  const formAgregar = document.getElementById('formAgregar');
  const listaRegistros = document.getElementById('listaRegistros');
  const filtroCampo = document.getElementById('filtroCampo');
  const filtroValor = document.getElementById('filtroValor');
  const btnFiltrar = document.getElementById('btnFiltrar');
  const btnReset = document.getElementById('btnReset');
  const historialCambios = document.getElementById('historialCambios');

  // Arreglos para almacenar registros y cambios
  let registros = [];
  let cambios = [];

  // Función para agregar un nuevo registro
  function agregarRegistro(nombre, edad, email, pais, profesion) {
    const nuevoRegistro = { nombre, edad, email, pais, profesion };
    registros.push(nuevoRegistro);
    mostrarRegistros();
    agregarCambio('Se agregó un nuevo registro');
  }

  // Función para mostrar todos los registros
  function mostrarRegistros() {
    listaRegistros.innerHTML = '';
    registros.forEach((registro, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>Nombre: ${registro.nombre}, Edad: ${registro.edad}, Email: ${registro.email}, País: ${registro.pais}, Profesión: ${registro.profesion}</span>
        <button class="editar" data-index="${index}">Editar</button>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      listaRegistros.appendChild(li);
    });
  }

  // Función para filtrar registros
  function filtrarRegistros() {
    const campo = filtroCampo.value;
    const valor = filtroValor.value.trim().toLowerCase();
    const registrosFiltrados = registros.filter(registro => registro[campo].toLowerCase().includes(valor));
    mostrarRegistrosFiltrados(registrosFiltrados);
  }

  // Función para mostrar registros filtrados
  function mostrarRegistrosFiltrados(registrosFiltrados) {
    listaRegistros.innerHTML = '';
    registrosFiltrados.forEach((registro, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>Nombre: ${registro.nombre}, Edad: ${registro.edad}, Email: ${registro.email}, País: ${registro.pais}, Profesión: ${registro.profesion}</span>
        <button class="editar" data-index="${index}">Editar</button>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      listaRegistros.appendChild(li);
    });
  }

  // Función para eliminar un registro
  function eliminarRegistro(index) {
    registros.splice(index, 1);
    mostrarRegistros();
    agregarCambio('Se eliminó un registro');
  }

  // Función para agregar un cambio al historial
  function agregarCambio(cambio) {
    cambios.push(cambio);
    mostrarCambios();
  }

  // Función para mostrar el historial de cambios
  function mostrarCambios() {
    historialCambios.innerHTML = '';
    cambios.forEach(cambio => {
      const li = document.createElement('li');
      li.textContent = cambio;
      historialCambios.appendChild(li);
    });
  }

  // Manejar el evento submit del formulario de agregar
  formAgregar.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = formAgregar.nombre.value;
    const edad = formAgregar.edad.value;
    const email = formAgregar.email.value;
    const pais = formAgregar.pais.value;
    const profesion = formAgregar.profesion.value;
    agregarRegistro(nombre, edad, email, pais, profesion);
    formAgregar.reset();
  });

  // Manejar los eventos de eliminar y editar registro
  listaRegistros.addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminar')) {
      const index = event.target.getAttribute('data-index');
      eliminarRegistro(index);
    } else if (event.target.classList.contains('editar')) {
      const index = event.target.getAttribute('data-index');
      const registro = registros[index];
      formAgregar.nombre.value = registro.nombre;
      formAgregar.edad.value = registro.edad;
      formAgregar.email.value = registro.email;
      formAgregar.pais.value = registro.pais;
      formAgregar.profesion.value = registro.profesion;
      // Ocultar botón de agregar
      formAgregar.querySelector('input[type="submit"]').style.display = 'none';
      // Mostrar botón de editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar Registro';
      btnEditar.classList.add('editar-registro');
      formAgregar.appendChild(btnEditar);
      // Manejar evento de edición
      btnEditar.addEventListener('click', function() {
        // Actualizar registro
        registros[index] = {
          nombre: formAgregar.nombre.value,
          edad: formAgregar.edad.value,
          email: formAgregar.email.value,
          pais: formAgregar.pais.value,
          profesion: formAgregar.profesion.value
        };
        mostrarRegistros();
        agregarCambio('Se editó un registro');
        // Limpiar formulario
        formAgregar.reset();
        // Mostrar botón de agregar y ocultar botón de editar
        formAgregar.querySelector('input[type="submit"]').style.display = 'block';
        btnEditar.remove();
      });
    }
  });

  // Manejar evento de filtrar registros
  btnFiltrar.addEventListener('click', filtrarRegistros);

  // Manejar evento de restablecer la vista
  btnReset.addEventListener('click', function() {
    mostrarRegistros();
    filtroValor.value = '';
  });

  // Mostrar los registros iniciales
  mostrarRegistros();
});