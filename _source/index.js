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

  const firstSectionIn = gsap.timeline();

  firstSectionIn.from('.background', {
    height: 0,
    duration: 1.5,
    delay: 0.25,
    ease: 'power1.in'
  });

  firstSectionIn.from('#introduction', {
    opacity: 0,
    y: '100vh',
    duration: 0.75,
    ease: 'power1.in'
  }, 0);

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
     isMobile: '(min-width: 320px)',
     isDesktop: '(min-width: 768px)'
  }, (context) => {
    let { isMobile, isDesktop } = context.conditions;

    firstSectionOut.to('h1', {
      xPercent: isDesktop ? -16.5 : -424,
      yPercent: isDesktop ? 4240 : 1800,
      scale: isDesktop ?  170 : 60,
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
