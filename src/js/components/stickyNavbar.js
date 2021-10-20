'use strict';

import { MOBILE_BREAKPOINT, NAVBAR_SELECTOR } from '../config/settings';

class StickyNavbar {
  constructor() {
    // Get the navbar element
    this.navbar = document.querySelector(NAVBAR_SELECTOR);

    // Define the transition classes to use while scrolling
    this.css = {
      hidden: 'navigation-wrapper-hidden',
      visible: 'navigation-wrapper-visible',
    };

    // Get/set the last scroll position
    this.lastY = window.pageYOffset;
    this.init();
  }

  init() {
    // If there's no navbar, return
    if (!this.navbar) return;
    this.events();
  }

  events() {
    // Watch for scroll events to determine if show/hide the navbar
    document.addEventListener('scroll', this.scrollProgress.bind(this), false);
  }

  scrollProgress() {
    // As it shouldn't work on mobile, check if it's above the minimum breakpoint
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      const st = document.documentElement.scrollTop;

      // If we're scrolling top, show the navbar
      if (st < this.lastY) {
        this.updClass(this.css.visible, this.css.hidden);
      }

      // If we're scrolling down, hide the navbar
      else {
        this.updClass(this.css.hidden, this.css.visible);
      }

      // Remove transition classes when hasn't scrolled or at the top of the page
      if (st <= 0) {
        this.navbar.classList.remove(this.css.visible, this.css.hidden);
      }
    }

    this.lastY = window.pageYOffset;
  }

  updClass(add, del) {
    this.navbar.classList.add(add);
    this.navbar.classList.remove(del);
  }
}

export default StickyNavbar;
