/*
import './bootstrap';
*/

var gradientElement = document.querySelector('.gradient');

document.addEventListener('mousemove', function(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    var gradient = 'radial-gradient(600px at ' + mouseX + 'px ' + mouseY + 'px, rgba(29, 78, 216, 0.15), transparent 80%)';
    gradientElement.style.background = gradient;
});
