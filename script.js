// Datos de ejemplo de ferias (cambiado a let para poder modificar)
let ferias = [
    {
        nombre: "Feria Gastronómica de San Blas",
        fecha: "2024-05-15",
        ubicacion: "Barrio de San Blas, Cusco",
        descripcion: "Degustación de platos típicos cusqueños y show de danzas tradicionales",
        imagen: "https://images.unsplash.com/photo-1544681280-d23e5c9d8289",
        coordenadas: {lat: -13.5163, lng: -71.9789}
    },
    {
        nombre: "Festival del Choclo y Queso",
        fecha: "2024-06-20",
        ubicacion: "Plaza Túpac Amaru, Cusco",
        descripcion: "Festival dedicado al mejor choclo y queso de la región",
        imagen: "https://images.unsplash.com/photo-1597289124948-688c1a35cb48",
        coordenadas: {lat: -13.5206, lng: -71.9785}
    },
    {
        nombre: "Feria del Cuy",
        fecha: "2024-07-10",
        ubicacion: "Tipón, Cusco",
        descripcion: "La mejor gastronomía tradicional con el cuy como protagonista",
        imagen: "https://images.unsplash.com/photo-1566740933430-b5e70d6bf0d6",
        coordenadas: {lat: -13.5634, lng: -71.7936}
    }
];

// Función para generar coordenadas aleatorias cerca de Cusco
function generarCoordenadas() {
    return {
        lat: -13.5163 + (Math.random() - 0.5) * 0.1,
        lng: -71.9789 + (Math.random() - 0.5) * 0.1
    };
}

// Función para animar la entrada de las ferias
function mostrarFerias() {
    const feriasGrid = document.getElementById('feriasGrid');
    feriasGrid.innerHTML = ''; // Limpiar el contenedor
    
    ferias.forEach((feria, index) => {
        const feriaCard = document.createElement('div');
        feriaCard.className = 'feria-card';
        feriaCard.style.opacity = '0';
        feriaCard.style.transform = 'translateY(20px)';
        feriaCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        feriaCard.style.transitionDelay = `${index * 0.1}s`;
        
        feriaCard.innerHTML = `
            <img src="${feria.imagen}" alt="${feria.nombre}">
            <div class="feria-info">
                <h3>${feria.nombre}</h3>
                <p><strong>Fecha:</strong> ${feria.fecha}</p>
                <p><strong>Ubicación:</strong> ${feria.ubicacion}</p>
                <p>${feria.descripcion}</p>
            </div>
        `;
        
        feriasGrid.appendChild(feriaCard);
        
        // Forzar reflow
        feriaCard.offsetHeight;
        
        // Animar entrada
        feriaCard.style.opacity = '1';
        feriaCard.style.transform = 'translateY(0)';
    });
}

// Animación para el formulario
function animarFormulario() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Animación para los marcadores del mapa
function inicializarMapa() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -13.5163, lng: -71.9789},
        zoom: 13,
        styles: [
            // Aquí puedes agregar estilos personalizados para el mapa
            // Ejemplo de estilo más suave
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"saturation": -80}]
            }
        ]
    });

    // Agregar marcadores con animación
    ferias.forEach((feria, index) => {
        setTimeout(() => {
            const marker = new google.maps.Marker({
                position: feria.coordenadas,
                map: map,
                title: feria.nombre,
                animation: google.maps.Animation.DROP
            });

            // Agregar InfoWindow con animación
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${feria.nombre}</h3><p>${feria.descripcion}</p>`
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }, index * 200);
    });
}

// Manejar el formulario de registro con animación y guardado de datos
document.getElementById('registroFeria').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const nombre = this.querySelector('input[placeholder="Nombre de la Feria"]').value;
    const fecha = this.querySelector('input[type="date"]').value;
    const ubicacion = this.querySelector('input[placeholder="Ubicación"]').value;
    const descripcion = this.querySelector('textarea').value;
    const imagenInput = this.querySelector('input[type="file"]');
    
    // Crear URL temporal para la imagen si se seleccionó una
    let imagen = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"; // Imagen por defecto
    if (imagenInput.files && imagenInput.files[0]) {
        imagen = URL.createObjectURL(imagenInput.files[0]);
    }
    
    // Crear nuevo objeto de feria
    const nuevaFeria = {
        nombre,
        fecha,
        ubicacion,
        descripcion,
        imagen,
        coordenadas: generarCoordenadas()
    };
    
    // Agregar la nueva feria al array
    ferias.push(nuevaFeria);
    
    const button = this.querySelector('button');
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        
        // Mostrar mensaje de éxito
        const mensaje = document.createElement('div');
        mensaje.className = 'mensaje-exito';
        mensaje.textContent = '¡Feria registrada exitosamente!';
        mensaje.style.position = 'fixed';
        mensaje.style.top = '20px';
        mensaje.style.right = '20px';
        mensaje.style.padding = '1rem';
        mensaje.style.backgroundColor = 'var(--color-accent)';
        mensaje.style.color = 'white';
        mensaje.style.borderRadius = '4px';
        mensaje.style.animation = 'slideIn 0.5s ease';
        document.body.appendChild(mensaje);
        
        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => mensaje.remove(), 500);
        }, 3000);
        
        this.reset();
        
        // Actualizar la visualización de ferias y el mapa
        mostrarFerias();
        inicializarMapa();
    }, 200);
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarFerias();
    inicializarMapa();
    animarFormulario();
    
    // Animación para el scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Agregar estilos para las animaciones del mensaje
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 