    document.addEventListener("DOMContentLoaded", function () {

    setTimeout(function () {
        fadeOutPreloader();
    }, 3000);
});

function fadeOutPreloader() {
    var preloader = document.getElementById("preloader-body");

    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = 0;

    setTimeout(function () {
        preloader.style.display = "none";
    }, 1000); 
}
