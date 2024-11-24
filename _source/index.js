import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', function() {
  // Setup GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Introduction animation of the first section
  const firstSectionIn = gsap.timeline();

  // Fade in each phrase of the paragraph
  firstSectionIn.from('#phrase-1', {
    opacity: 0
  });

  firstSectionIn.from('#phrase-2', {
    opacity: 0
  },
  '+=0.25');

  firstSectionIn.from('#phrase-3', {
    opacity: 0
  },
  '+=0.25');

  firstSectionIn.from('#section-1 .button', {
    opacity: 0
  },
  '+=0.25');

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
      color: '#FFF',
      xPercent: isDesktop ? -20 : -1354,
      yPercent: 3000,
      scale: isDesktop ?  206 : 100,
      ease: 'none'
    });
  });

  //Setup stacked sections
  gsap.set('.stack section', { zIndex: (i, target, targets) => i < 2 && i == 0 ? 1 : 0 });
  gsap.set('.stack section:nth-child(3)', { yPercent: 100 });
  gsap.set('.stack section:nth-child(4)', { yPercent: 100 })
  gsap.set('.stack section:last-child', { yPercent: 100 });

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

  // Setup cards
  const cards = gsap.utils.toArray('.cards iframe');
  gsap.set(cards, { yPercent: (i, target, targets) => i != 0 ? 200 : 0 });

  // Scroll cards vertically
  cards.forEach((card, i) => {
    stackedSections.to(card, {
      yPercent: i * 2,
      ease: 'none'
    });
  });

  // Uncover the third section
  stackedSections.to('#section-2', {
    yPercent: -100,
    ease: 'none'
  });

  // Cover the third section
  stackedSections.to('#section-3', {
    yPercent: 0,
    ease: 'none'
  });

  // Cover the fourth section
  stackedSections.to('#section-4', {
    yPercent: 0,
    ease: 'none'
  })

  // Setup panels
  const panels = gsap.utils.toArray('.panel');

  // Scroll panels horizontally
  stackedSections.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none'
  });

  // Cover the fifth section
  stackedSections.to('#section-5', {
    yPercent: 0,
    ease: 'none'
  })

  stackedSections.to('#section-6', {
    yPercent: 0,
    ease: 'none'
  });
});
