export default class Carousel {
  constructor() {
    this.slideIndex = 1;
  }

  init() {
    this.showSlides(this.product, this.slideIndex);
    this.pageChangeListener();
  }
  pageChangeListener() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.currentSlide(index + 1));
    });
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    prev.addEventListener("click", () => this.plusSlides(-1));
    next.addEventListener("click", () => this.plusSlides(1));
  }
  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }
}
