const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. Datos del objetivo y puntos
let puntos = 0;
let objetivo = {
    x: 400,
    y: 300,
    radio: 45, // Un poquito más grande para que sea fácil atraparlo en movimiento
    vx: 3,     // Velocidad horizontal (cambiá este número para hacerlo más rápido o lento)
    vy: 3      // Velocidad vertical
};

// 2. Función para dibujar todo
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el círculo rojo
    ctx.beginPath();
    ctx.arc(objetivo.x, objetivo.y, objetivo.radio, 0, Math.PI * 2);
    ctx.fillStyle = '#ff5252';
    ctx.fill();

    // Dibujar el puntaje
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('Puntos: ' + puntos, 20, 40);
}

// 3. Función para mover y rebotar en los bordes
function mover() {
    objetivo.x += objetivo.vx;
    objetivo.y += objetivo.vy;

    // Rebote en pared derecha o izquierda
    if (objetivo.x + objetivo.radio > canvas.width || objetivo.x - objetivo.radio < 0) {
        objetivo.vx *= -1;
    }

    // Rebote en techo o piso
    if (objetivo.y + objetivo.radio > canvas.height || objetivo.y - objetivo.radio < 0) {
        objetivo.vy *= -1;
    }
}

// 4. Bucle continuo (anima el movimiento)
function bucleJuego() {
    mover();
    dibujar();
    requestAnimationFrame(bucleJuego);
}

// 5. Detectar el clic mientras se mueve
canvas.addEventListener('click', function(evento) {
    const rect = canvas.getBoundingClientRect();
    const clicX = evento.clientX - rect.left;
    const clicY = evento.clientY - rect.top;

    const distancia = Math.hypot(clicX - objetivo.x, clicY - objetivo.y);

    if (distancia < objetivo.radio) {
        puntos++;

        // Salta a una nueva posición al azar
        objetivo.x = Math.random() * (canvas.width - objetivo.radio * 2) + objetivo.radio;
        objetivo.y = Math.random() * (canvas.height - objetivo.radio * 2) + objetivo.radio;
        
        // Invertimos dirección al azar para que sea impredecible
        objetivo.vx *= Math.random() > 0.5 ? 1 : -1;
        objetivo.vy *= Math.random() > 0.5 ? 1 : -1;
    }
});

// Arrancamos la animación
bucleJuego();