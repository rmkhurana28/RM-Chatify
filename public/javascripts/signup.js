const initial = document.getElementById('initial');

const nameBox = document.getElementById("name");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");

const emailBox = document.getElementById("email");
const block3 = document.getElementById("block3");
const block4 = document.getElementById("block4");

const passwordBox = document.getElementById("password");
const end = document.getElementById("end");
const para = document.getElementById("para");

let nameBoxAnimation = false;
let emailBoxAnimation = false;
let passwordBoxAnimation = false;

window.onload = function() {
    console.log("page loaded");
    gsap.from(initial , {
        width : '30%',
        opacity : 0,
        duration : 1,
    })
};

nameBox.addEventListener("input", () => {
    if(nameBoxAnimation) return;
    const tl1 = gsap.timeline();
    tl1.to(block1, {
        opacity : 1,
        width : '60%',
        duration: 2,
    })
    tl1.to(block2 , {
        opacity : 1,
        width : '60%',
        duration: 2,
    })
    nameBoxAnimation = true;
});

emailBox.addEventListener("input", () => {
    if(!nameBoxAnimation) return;
    if(emailBoxAnimation) return;
    const tl2 = gsap.timeline();
    tl2.to(block3, {
        opacity : 1,
        width : '60%',
        duration: 2,
    })
    tl2.to(block4 , {
        opacity : 1,
        width : '60%',
        duration: 2,
    })
    emailBoxAnimation = true;
});

passwordBox.addEventListener("input", () => {
    if(!nameBoxAnimation) return;
    if(!emailBoxAnimation) return;
    if(passwordBoxAnimation) return;
    const tl3 = gsap.timeline();
    tl3.to(end, {
        opacity : 1,
        width : '50%',
        duration: 2,
    })    
    .to(end , {
        y : '+=200',
    })
    .to(para , {
        y : '-=100',
        fontSize : '30px',
        opacity : 1,
    })
    .to(block4 , {
        rotate : -30,
        y : '+=260',
    })
    .to(block3 , {
        rotate : 27,
        y : '+=190',
    })
    .to(block2 , {
        rotate : -15,
        y : '+=110',
    })
    .to(block1 , {
        rotate : 20,
        y : '+= 100'
    })
    .to(initial , {
        rotate : -15,
        y : '+=50',
    })
    .to(initial , {
        rotate : 360,
        x : '-=1000',
    })
    .to(block1 , {
        rotate : 360,
        x : '+=1000',
    })
    .to(block2 , {
        rotate : 360,
        x : '-=1000',
    })
    .to(block3 , {
        rotate : 360,
        x : '+=1000',
    })
    .to(block4 , {
        rotate : 360,
        x : '-=1000',
    })    
    .to(end , {
        y : '-=400',
        scale : 1.5,
    })
    .to(para , {
        y : '+=100',
        scale : 1.5,
        textShadow : '0 0 25px rgb(106, 106, 106)',
    })
    passwordBoxAnimation = true;
});