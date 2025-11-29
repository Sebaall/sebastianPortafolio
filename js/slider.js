function iniciarGaleria(idContenedor) {
    let currentSlide = 0;
    const container = document.getElementById(idContenedor);
    
    if (!container) return;

    const slides = container.querySelectorAll('.slide');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

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

    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    if(prevBtn) prevBtn.addEventListener('click', prevSlide);

    setInterval(nextSlide, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarGaleria('gallery-1'); 
    iniciarGaleria('gallery-2'); 
    iniciarGaleria('gallery-3'); 
});