const gray_box = document.getElementById("gray_pic");
const gray_sound = document.getElementById("gray_noises");
const spooky_sound = document.getElementById("spooky_scary");
const unspooky_sound = document.getElementById("scary_spooky");
const volume_slider = document.getElementById("volume_range")

var clicky_counter = document.getElementById("clicky_counter");
var total_clicks = 0;
var clicky_volume = (volume_slider.value / 1000);

volume_slider.oninput = function() {
    clicky_volume = (this.value / 1000);
}

dragElement(document.getElementById("gray_box"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        if (elmnt.style.transform != ('rotate(' + (-0.5*pos1) + 'deg)') && Math.abs(pos1) >= 1) {
            elmnt.style.transform = ('rotate(' + (-0.5*pos1) + 'deg)');
        }
        if (Math.abs(pos1) >= 7.5) {
            volume_slider.value -= pos1/3;
            clicky_volume = volume_slider.value/1000;
        }
        if (Math.abs(pos1) <= 1) {
            elmnt.style.transform = 'rotate(0deg)';
        }
        if (Math.abs(pos1) >= 175) {
            total_clicks = 0;
            clicky_counter.textContent = total_clicks;
            gray_pic.style.filter = 'contrast(100%)'
            if (total_clicks >= 100) {
                unspooky_sound.currentTime = 0;
                unspooky_sound.volume = clicky_volume;
                unspooky_sound.play();
            }
        }
    }

    function closeDragElement() {
        canDrag = false;
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.top = '75px';
        elmnt.style.left = '8px';
        elmnt.style.transform = 'rotate(0deg)'
        elmnt.style.transition = "transform 0.15s cubic-bezier(.02,.19,.4,.99), left 0.2s cubic-bezier(.43,1.28,.67,.98), top 0.2s cubic-bezier(.43,1.28,.67,.98)";
        setTimeout(function() {
            elmnt.style.transition = "";
        }, 200)
    }
}

function thingy() { 
    pauseAudio = setTimeout(function() {
        gray_sound.pause();
    }, 500);
}

thingy()

gray_box.addEventListener("click", function() {
    clearTimeout(pauseAudio);
    thingy()
    total_clicks += 1;
    clicky_counter.textContent = total_clicks;
    gray_sound.currentTime = Math.floor(Math.random() * 19);
    gray_sound.volume = clicky_volume;
    gray_sound.play();

    if (total_clicks == 100) {
        gray_pic.style.filter = 'contrast(200%)';
        spooky_sound.currentTime = 0;
        spooky_sound.volume = clicky_volume;
        spooky_sound.play();
    }
})

document.getElementById("reset_counter").addEventListener("click", function() {
    total_clicks = 0;
    clicky_counter.textContent = total_clicks;
    gray_pic.style.filter = 'contrast(100%)'
    if (total_clicks >= 100) {
        unspooky_sound.currentTime = 0;
        unspooky_sound.volume = clicky_volume;
        unspooky_sound.play();
    }
})