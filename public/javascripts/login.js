const initial = document.getElementById('initial');

const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");

const end = document.getElementById("end");
const para = document.getElementById("para");

let emailBoxAnimation = false;
let passwordBoxAnimation = false;

window.onload = function() {
    console.log("page loaded");
    const tl0 = gsap.timeline();
    tl0.from(initial , {
        y : '+=300',
        borderRadius : '50%',
        width : '30%',
        height : '80%',
        fontSize : '50px',
        opacity : 0,
        duration : 3,
    })
    .to(block1 , {
        y : '+=160',
        height : '30%',
        width : '50%',
        borderRadius : '50%',
        opacity : 0,
    })
    .to(block1 , {                
        opacity : 1,
    })
};

const emailBox = document.getElementById("email");

emailBox.addEventListener("input", () => {
    if(emailBoxAnimation) return;
    const tl1 = gsap.timeline();    
    tl1.to(block1 , {
        y : '-=160',
        height : '10%',
        width : '70%',
        borderRadius : '1%',
    })
    .to(block2 , {
        y : '+=90',
        height : '30%',
        width : '50%',
        borderRadius : '50%',
        opacity : 0,
    })
    .to(block2 , {
        opacity : 1,
    })

    emailBoxAnimation = true;
});

const passwordBox = document.getElementById("password");

passwordBox.addEventListener("input", () => {
    if(!emailBoxAnimation) return;
    if(passwordBoxAnimation) return;

    const tl2 = gsap.timeline();

    tl2.to(block2 , {
        y : '-=90',
        height : '10%',
        width : '80%',
        borderRadius : '2%',        
        duration : 2,
    })
    .to(end , {
        opacity : 1,        
    })
    .to(block2 , {
        x : '+=1000',
        rotate : 360,        
    })
    .to(block1 , {
        x : '-=1000',
        rotate : -360,        
    })
    .to(initial , {
        opacity : 0 ,
        y : '+=200'
    })
    .to(end , {
        y : '-=200',
        textShadow : '0 0 10px rgb(153, 153, 153)'
    })
    passwordBoxAnimation = true;
});