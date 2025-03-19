window.onload = function() {    
    let tl = gsap.timeline();

    tl.from('.navbar h1' , {
        y : '-20',
        opacity : 0,
        duration : 2,
    })
}

let tl2 = gsap.timeline({
    scrollTrigger : {
        trigger : '#page1',
        scroller : 'body',
        start : 'top 0%'
    }
});

tl2.from('#page1 h1' , {    
        opacity : 0.3,
        y : '+=60px',
        duration : 1,
    })
    .to('#page1 h1' , {    
        duration : 1,
        scale : 0,
        opacity : 0.3,        
    })
    .to('#page1 h1' , {
        duration : 0,
        scale : 1,
        fontSize : '75px',
        onComplete : () => {
            document.getElementById("message").innerText = "Welcome To The Ultimate World Of Chatting";
        }
    })    
    .to('#page1 h1' , {
        opacity : 1,
        y : '-80px',
        duration : 2,        
    })
    .to('#page1 #test' , {
        visibility : 'visible',
        duration : 0,
    })
    .to('#page1 #test' , {
        y : '-= 60px',
        duration : 0,
    })
    .to('#page1 #test' , {
        width : '52%',
    })
    .to('#page1 h2' , {        
        width : '75%',
        duration : 2,
    })

var tl3 = gsap.timeline({
    scrollTrigger : {
        trigger : '#page2',
        scroller : 'body',
        start : 'top 0%',
        end : 'top -100%',
        pin : true,
        scrub : 1,
    }
});

tl3.from('#page2 #image' , {
        y : '+=500',
        opacity : 0.1,                
        boxShadow: '0 0 80px 1px rgb(255, 255, 255)',
        duration : 1,
    })
    .to('#page2 #image' , {
        x : '-=570px',
        boxShadow: '0 0 80px 15px rgb(52, 209, 233)',
        duration : 1,
    })
    .to('#page2 #section #top h1' , {
        opacity : 1,
        width : '100%',
    })
    .to('#page2 #section #middle button' , {
        visibility : 'visible',
    })
    .to('#page2 #section #middle button' , {
        opacity : 1,
        width : '70%',
    })
    .from('#page2 #section #bottom .data' , {
        x : 80,
        stagger : 0.1,
        opacity : 0,
    })


var tl4 = gsap.timeline({
    scrollTrigger : {
        trigger : '#page3',
        scroller : 'body',
        start : 'top 0%',
        end : 'top -100%',
        pin : true,
        scrub : 1,
    }
});

tl4.to('#page3 h1' , {
    transform : 'translateX(-170%)',
})