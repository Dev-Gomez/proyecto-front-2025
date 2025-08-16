
//  nombre = "Javier";
//  edad = 26;

// alert("mi nombre es:" + nombre + " y tengo: " + edad);

const navigator = document.querySelector(".navigator");
const navbar = document.querySelector (".navbar");
const closenavbar = document.querySelector (".close-navbar");
const out = document.querySelector("main");



navbar.addEventListener("click", function(){
navigator.classList.add("show"); 
});

closenavbar.addEventListener("click", function(){
    navigator.classList.remove("show");
});

out.addEventListener("click",function(){
    navigator.classList.remove("show");
});

window.onload = function(){

  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right")

  leftBtn.addEventListener("click", function(){
    $(".slider").slick("slickPrev");
  });

  rightBtn.addEventListener("click", function(){
    
    $(".slider").slick("slickNext");
  });

  $('.slider').slick({
    arrows:false,
    dots:false,
    autoplay: true,
    autoplaySpeed:4000,
    pauseOnHover:false,
    adaptiveHeight:true,
    fade: false,
  })
};

$('#contact').parsley()