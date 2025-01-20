const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

//animation
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      stagger: 0.2,
      duration: 2,
    })

    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

var timeout;

function circleChapta() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;
    // console.log(xdiff, ydiff);
    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(
      function () {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
      }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    // console.log(dets);
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale} , ${yscale})`;
  });
}

circleChapta();
circleMouseFollower();
firstPageAnim();

// photo animation
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "Power3.out",  
      duration: 0.5,   
    });
  });

  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX; 
    
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "Power3.out",
      top: diff + "px",
      left: details.clientX + "px",
      rotate: gsap.utils.clamp(-20, 20, diffrot),      
    });
  });
}); 

 