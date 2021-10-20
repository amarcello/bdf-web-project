'use strict';

import { NAVBAR_MENU_ITEM, NAVBAR_SELECTOR } from '../config/settings';
import FactCounter from './factCounter';

class ScrollWatch {
  constructor() {
    // Get all the sections to animate/watch enter/leave states
    this.sections = document.querySelectorAll('[data-scroll-watch]');

    // Get all the navigation links to update the styling while scrolling through sections
    this.navbarItems = document.querySelectorAll(
      `${NAVBAR_SELECTOR} ${NAVBAR_MENU_ITEM}`
    );

    this.init();
  }

  init() {
    if ('IntersectionObserver' in window && this.sections) {
      const obsOptions = {
        root: null,
        threshold: 0.3,
      };

      this.observer = new IntersectionObserver(
        this.observerCallback.bind(this),
        obsOptions
      );

      // Interact with each section when 30% of it is entering into view
      this.sections.forEach(sec => this.observer.observe(sec));
    }
  }

  observerCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // get the section id
      const { id } = entry.target;
      const animatedCss = 'animated-watched';

      if (id === 'facts' && !entry.target.classList.contains(animatedCss)) {
        new FactCounter();
      }

      // add entered animation class
      entry.target.classList.add(animatedCss);

      // update history navigation to match current section
      this.updNavigation(id);
    });
  }

  updHistory(hash) {
    // update history navigation to match current section
    clearTimeout(this.updHistory.timeout);
    this.updHistory.timeout = setTimeout(function () {
      if (window.location.hash !== hash) {
        history.pushState({}, window.title, hash);
      }
    }, 500);
  }

  updNavigation(target) {
    const url = `#${target}`;
    const cssActive = 'navigation-menu-item-active';

    // get the nav item corresponding to the id of the section
    // that is currently in view
    const [navItem] = Array.from(this.navbarItems).filter(
      item => item.querySelector('a').getAttribute('href') === url
    );

    if (!navItem) return;

    // add cssActive class on the navItem
    navItem.classList.add(cssActive);

    // upd URL history
    this.updHistory(url);

    if (!this.navbarItems) return;

    // remove cssActive class from any navItem that is not
    // same as 'navItem' defined above
    this.navbarItems.forEach(link => {
      if (link.querySelector('a').getAttribute('href') !== url)
        link.classList.remove(cssActive);
    });
  }
}

export default ScrollWatch;
