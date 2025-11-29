function iniciarGaleria(idContenedor) {
    let currentSlide = 0;
    // Buscamos el contenedor específico (gallery-1, gallery-2, etc.)
    const container = document.getElementById(idContenedor);
    
    // Si no existe el contenedor, no hacemos nada
    if (!container) return;

    // Buscamos SOLO las slides y botones dentro de ESTE contenedor
    const slides = container.querySelectorAll('.slide');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    // Tu lógica original
    function showSlide(i) {
        slides.forEach(s => s.classList.remove('active'));
        slides[i].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event Listeners para los botones
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Intervalo automático (opcional, cada 3.5s)
    setInterval(nextSlide, 3500);
}

// Inicializamos las 3 galerías
document.addEventListener('DOMContentLoaded', () => {
    iniciarGaleria('gallery-1'); // Para ReciclaMap
    iniciarGaleria('gallery-2'); // Para Numerix
    iniciarGaleria('gallery-3'); // Para El Líder
});