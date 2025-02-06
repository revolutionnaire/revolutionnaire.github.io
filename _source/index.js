import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

document.addEventListener('DOMContentLoaded', function() {
  // Setup GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Setup Lenis
  const lenis = new Lenis({
    autoRaf: true
  });

  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  // Setup scroll to booking from
  // const booking = document.getElementById('booking');
  // booking.addEventListener('click', function (event) {
  //   event.preventDefault;
  //   lenis.scrollTo('#section-7');
  // });

  const loadingAnimation = gsap.timeline({
    repeat: -1
  });

  loadingAnimation.to('#fireworks', {
    opacity: 0,
    duration: 0.01,
    delay: 0.25,
    ease: 'power1.in'
  }).to('#shocked', {
    opacity: 1,
    duration: 0.01,
    delay: 0.25,
    ease: 'power1.in'
  }, '<');

  loadingAnimation.to('#shocked', {
    opacity: 0,
    duration: 0.01,
    delay: 0.25,
    ease: 'power1.in'
  }).to('#fireworks',{
    opacity: 1,
    duration: 0.01,
    delay: 0.25,
    ease: 'power1.in'
  }, '<');

  const loadingOut = gsap.timeline();

  loadingOut.to('#loading', {
    clipPath: 'polygon(0% 0%, 100% 0, 100% 0%, 0% 0%)',
    duration: 0.25,
    delay: 2,
    ease: 'power1.in'
  });

  // Exit animation of the first section on scroll
  const firstSectionMM = gsap.matchMedia();
  const firstSectionOut = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-2',
      start: 'top bottom',
      end: 'center center',
      scrub: true,
      pin: '#section-1',
      refreshPriority: 1
    }
  });

  firstSectionMM.add({
    isiPhone: '(min-width: 320px)',
    isiPadMini: '(min-width: 768px)',
    isiPadPro: '(height: 1366px)',
    isDesktop: '(min-width: 1024px)'
  }, (context) => {
    let { isiPhone, isiPadMini, isiPadPro, isDesktop } = context.conditions,
        xPercent,
        yPercent,
        scale;

    switch(true) {
      case isiPadMini:
        xPercent = -350;
        yPercent = 2240;
        scale = 117;
        break;
      case isiPhone:
        xPercent = -424;
        yPercent = 1800;
        scale = 60;
        break;
      case isiPadPro:
        xPercent = -16.5;
        yPercent = 4240;
        scale = 380;
      case isDesktop:
        xPercent = -16.5;
        yPercent = 4240;
        scale = 170;
        break;
    }

    firstSectionOut.to('h1', {
      xPercent: xPercent,
      yPercent: yPercent,
      scale: scale,
      ease: 'none'
    });
  });

  //Setup stacked sections
  gsap.set('.stack section:first-child', { zIndex: 2 });
  gsap.set('.stack .sub', { zIndex: (i, target, targets) => i > 0 ? i + 3 : 1, yPercent: (i, target, targets) => i > 0 ? 100 : 0 });
  gsap.set('.stack footer', { zIndex: 0, yPercent: 100 });

  // Animate the stacked sections on scroll
  const stackedSections = gsap.timeline({
    scrollTrigger: {
      trigger: '.stack',
      start: 'top top',
      end: 'top+=300% top',
      scrub: true,
      pin: true
    }
  });

  // Initialize second section content animation
  const secondSectionIn = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-2',
      start: 'top bottom',
      end: 'center center',
      scrub: true
    }
  });

  // Fade in text on second section
  secondSectionIn.from('#services', {
    opacity: 0,
    ease: 'none'
  });

  // Uncover the third section
  stackedSections.to('#section-2', {
    yPercent: -100,
    ease: 'none'
  });

  // Setup sub-stacked and simultaneous sections
  const simultaneous = gsap.utils.toArray('.stack .simultaneous');
  const substack = gsap.utils.toArray('.stack .sub');

  // Cover the third section
  stackedSections.to('#section-4', {
    yPercent: 0,
    ease: 'none'
  })

  // Setup cards
  const cards = gsap.utils.toArray('.cards iframe');
  gsap.set(cards, { yPercent: (i, target, targets) => i != 0 ? 420 : 0 });

  // Scroll cards vertically
  cards.forEach((card, i) => {
    stackedSections.to(card, {
      yPercent: i * 2,
      ease: 'none'
    });
  });

  // Cover the fourth section
  stackedSections.to('#section-5', {
    yPercent: 0,
    ease: 'none'
  })

  // Cover fifth section
  stackedSections.to(simultaneous, {
    yPercent: 0,
    ease: 'none'
  });

  // Uncover footer
  stackedSections.to(substack, {
    yPercent: -100,
    ease: 'none'
  });
});
