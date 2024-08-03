let pageLoaded = false;
let gif2Played = false;

// Load first GIF and wait until it is displayed
let gif1 = new Image();
gif1.src = '/IMAGES/load1.gif';
let gif2 = new Image();
gif2.src = '/IMAGES/load2.gif';
gif1.onload = function () {
    gif2.onload = function () {
        // Change to the second GIF after 1 second
        document.getElementById("preloader").style.backgroundSize = window.matchMedia("(max-width: 820px)").matches ? "70%" : "50%";
        document.getElementById("preloader").style.visibility = "visible";
        setTimeout(function () {



            // Load the second GIF and wait until it is displayed
            document.getElementById("preloader").style.background = "url('/IMAGES/load2.gif') no-repeat center center";
            document.getElementById("preloader").style.backgroundSize = window.matchMedia("(max-width: 820px)").matches ? "70%" : "50%";
            // After another second, set gif2Played to true and check if the page is loaded
            setTimeout(function () {
                gif2Played = true;
                if (pageLoaded && document.body.style.transition != "1s") {

                    document.getElementById("preloader").style.display = "none";
                    document.body.style.visibility = "visible";
                    document.body.style.opacity = "0";
                    setTimeout(function () {
                        document.body.style.transition = "1s";
                        document.body.style.opacity = "1";
                        document.documentElement.style.cursor = "auto";
                    }, 50);
                }
            }, 1000);
        }, 1000);
    };
};

// Event listener for page load
window.addEventListener("load", function () {
    pageLoaded = true;
    if (gif2Played && document.body.style.transition != "1s") {
        document.getElementById("preloader").style.display = "none";
        document.body.style.visibility = "visible";
        document.body.style.opacity = "0";
        setTimeout(function () {
            document.body.style.transition = "1s";
            document.body.style.opacity = "1";
            document.documentElement.style.cursor = "auto";
        }, 50);
    }
});

const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = () => {
    navbar.classList.add("show");
    menuBtn.classList.add("hide");
    body.classList.add("disabled");
}
cancelBtn.onclick = () => {
    body.classList.remove("disabled");
    navbar.classList.remove("show");
    menuBtn.classList.remove("hide");
}
window.onscroll = () => {
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

function closeSide() {
    body.classList.remove("disabled");
    navbar.classList.remove("show");
    menuBtn.classList.remove("hide");

}

const inputs = document.querySelectorAll(".contact-input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});


document.addEventListener('scroll', function () {
    const toTopButton = document.getElementById('toTop');
    if (window.scrollY === 0) {
        toTopButton.classList.add('disabled');
    } else {
        toTopButton.classList.remove('disabled');
    }
});

// Array of data for the slides
const slides = [
    {
        heading: "Innovate, Develop & Design",
        subheading: "Your Vision, Our Expertise",
        text: "Designing and developing the websites of your need, visually appealing and fully functional. ",
        image: "<img onclick='changeSlide()' src='IMAGES/g1.png' alt='Manufacture' />"
    },
    {
        heading: "E-Commerce Solutions",
        subheading: "Seamless Online Store Management",
        text: "Expertly Crafted e-commerce websites and efficient management. Smooth Shopping Experience for your Customers.",
        image: "<img onclick='changeSlide()' src='IMAGES/g2.png' alt='Ecommerce' />"
    },
    {
        heading: "Digital Marketing Mastery",
        subheading: "Engage and Grow Your Audience",
        text: "Achieve Brand Success with Trending Strategies to boost user engagement and amplify your Reach.",
        image: "<img onclick='changeSlide()' src='IMAGES/g3.png' alt='Laptop' />"
    },
    {
        heading: "Reliable and Responsive",
        subheading: "Unmatched Assistance",
        text: "Receive expert, reliable support anytime you need it and make your business GO.",
        image: "<img onclick='changeSlide()' src='IMAGES/g4.png' alt='Discussion' />"
    }

];

let counter = -1;

function changeSlide() {
    counter = (counter + 1) % slides.length;
    document.getElementById('hero-image').innerHTML = slides[counter].image;
    document.getElementById('hero-heading').textContent = slides[counter].heading;
    document.getElementById('hero-subheading').textContent = slides[counter].subheading;
    document.getElementById('hero-text').textContent = slides[counter].text;
}

// Change slide every 15 seconds
setInterval(changeSlide, 15000);

document.getElementById('contactNow').addEventListener('click', function () {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

const form = document.getElementById('form');
const result = document.getElementById('result');
const submit = document.getElementById('submitForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";
    submit.value = "Wait...";
    document.documentElement.style.cursor = "wait";
    submit.style.cursor = "wait";
    submit.style.backgroundColor = "white";
    submit.style.borderColor = "white";
    submit.style.color = "#5E17EB";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                submit.value = "Email Sent";
                document.documentElement.style.cursor = "auto";
                submit.style.cursor = "not-allowed";
                submit.style.backgroundColor = "seagreen";
                submit.style.borderColor = "seagreen";
                submit.style.color = "white";
                form.reset();
            } else {
                console.log(response);
                result.innerHTML = json.message;
                alert(response + "\n" + result.innerHTML);
                submit.value = "Failed";
                document.documentElement.style.cursor = "auto";
                submit.style.cursor = "not-allowed";
                submit.style.backgroundColor = "firebrick";
                submit.style.borderColor = "firebrick";
                submit.style.color = "white";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            alert(error + "\n" + result.innerHTML);
            submit.value = "Error";
            document.documentElement.style.cursor = "auto";
            submit.style.cursor = "not-allowed";
            submit.style.backgroundColor = "firebrick";
            submit.style.borderColor = "firebrick";
            submit.style.color = "white";
        })
        .then(function () {
            hcaptcha.reset();
            setTimeout(() => {
                submit.value = "Send";
                document.documentElement.style.cursor = "auto";
                submit.style.cursor = "pointer";
                submit.style.backgroundColor = "transparent";
                submit.style.borderColor = "white";
                submit.style.color = "white";
            }, 6000);
        });
});

function copyMail() {
    navigator.clipboard.writeText("services.synergyx@gmail.com");
    alert("Copied the Email");
};


let isVisible = false;
const moreCards = document.querySelectorAll('.more');
function showMoreServ() {
    if (isVisible) {
        moreCards.forEach(card => {
            card.style.display = 'none';
            isVisible = false;
            document.querySelector('#expandServ i').style.rotate = '-180deg';
        });
    } else {
        moreCards.forEach(card => {
            card.style.display = 'flex';
            isVisible = true;
            document.querySelector('#expandServ i').style.rotate = '0deg';
        });
    }
};


// counter

let section_counter = document.querySelector('#section_counter');
let counters = document.querySelectorAll('.counter-item .counter');

// Scroll Animation

let CounterObserver = new IntersectionObserver(
    (entries, observer) => {
        let [entry] = entries;
        if (!entry.isIntersecting) return;

        let speed = 99;
        counters.forEach((counter, index) => {
            function UpdateCounter() {
                const targetNumber = +counter.dataset.target;
                const initialNumber = +counter.innerText;
                const incPerCount = targetNumber / speed;
                if (initialNumber < targetNumber) {
                    counter.innerText = Math.ceil(initialNumber + incPerCount);
                    setTimeout(UpdateCounter, 20);
                }
                else {
                    counter.innerText = targetNumber;
                    if (targetNumber === 999999) {
                        counter.innerHTML = '<i class="fa-solid fa-infinity"></i>';
                    }
                }
            }
            UpdateCounter();

            if (counter.parentElement.style.animation) {
                counter.parentElement.style.animation = '';
            } else {
                counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${index / counters.length + 0.5}s`;
            }
        });
        observer.unobserve(section_counter);
    },
    {
        root: null,
        threshold: window.innerWidth > 768 ? 0.4 : 0.3,
    }
);

CounterObserver.observe(section_counter);


// Prevent right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
// Prevent certain key shortcuts
document.addEventListener('keydown', function (e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, and Ctrl+S
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S')
    ) {
        e.preventDefault();
    }
});