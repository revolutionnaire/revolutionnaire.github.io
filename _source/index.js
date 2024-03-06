import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', function() {
  // Setup GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Zoom in text
  let firstSectionMM = gsap.matchMedia();
  let firstSectionOut = gsap.timeline({
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
      color: '#FFF',
      xPercent: isDesktop ? 1868 : -1420,
      yPercent: isDesktop ? 7200 : -800,
      scale: isDesktop ?  206 : 160,
      ease: 'none'
    });
  });

  // Animate the entrance of the contents of the second fold
  let thirdSectionIn = gsap.timeline();

  // Zoom out the whole paragraph
  thirdSectionIn.from('#social-media', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'top center',
      end: 'center center',
      scrub: true
    },
    scale: 4,
    ease: 'none'
  });

  // Fade in each phrase one by one
  thirdSectionIn.from('#phrase-4', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'top 50%',
      end: 'center center',
      scrub: true
    },
    opacity: 0,
    ease: 'none'
  });

  thirdSectionIn.from('#phrase-5', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'top 45%',
      end: 'center center',
      scrub: true
    },
    opacity: 0,
    ease: 'none'
  });

  thirdSectionIn.from('#phrase-6', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'top 40%',
      end: 'center center',
      scrub: true
    },
    opacity: 0,
    ease: 'none'
  });

  thirdSectionIn.from('#phrase-7', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'top 35%',
      end: 'center center',
      scrub: true
    },
    opacity: 0,
    ease: 'none'
  });

  thirdSectionIn.from('#phrase-8', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'top 30%',
      end: 'center center',
      scrub: true
    },
    opacity: 0,
    ease: 'none'
  });

  // Setup stacked sections
  // const panelContainer = document.getElementById('section-4');
  const panels = gsap.utils.toArray('.panel');
  gsap.set('.stack section', { zIndex: (i, target, targets) => i === targets.length - 1 ? targets.length - 1 : targets.length - i });
  gsap.set('.stack section:last-child', { yPercent: 100 });

  // Animate the stacked sections on scroll
  let stackedSections = gsap.timeline({
    scrollTrigger: {
      trigger: '.stack',
      start: 'top top',
      end: 'top+=300% top',
      scrub: true,
      pin: true
    }
  });

  // Uncover the third section
  stackedSections.to('#section-3', {
    yPercent: -100,
    ease: 'none'
  });

  // Cover the third section
  stackedSections.to('#section-5', {
    // scrollTrigger: {
    //   trigger: '.stack',
    //   start: '+=200%',
    //   end: '+=300%',
    //   scrub: true,
    //   pin: true
    // },
    yPercent: 0,
    ease: 'none'
  });

  stackedSections.to(panels, {
    // scrollTrigger: {
    //   trigger: panelContainer,
    //   end: () => '+=' + panelContainer.offsetWidth,
    //   pin: true,
    //   scrub: true,
    //   snap: {
    //     snapTo: 1 / (panels.length - 1),
    //     duration: { min: 0, max: 0.5 },
    //     delay: 0,
    //     ease: 'cubic-bezier(.17,.67,.49,1)'
    //   }
    // },
    xPercent: -100 * (panels.length - 1),
    ease: 'none'
  });
});
