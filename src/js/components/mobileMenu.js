'use strict';

import { MOBILE_BREAKPOINT, NAVBAR_MENU_ITEM } from '../config/settings';

class MobileMenu {
  constructor(menuSel, menuClass, menuOpen) {
    // Get the navbar element
    this.menu = document.querySelector(menuSel);

    // Get the hamburger button element
    this.hamburgerMenu = this.menu.querySelector(menuOpen);

    // Set menu open class
    this.cssOpen = menuClass; //class to add when open
    this.mobileOpen = false;
    this.events();
  }

  events() {
    // If there's no hamburger menu, return
    if (!this.hamburgerMenu) return;
    this.menu.addEventListener('click', this.setAction.bind(this));
    // this.hamburgerMenu.addEventListener('click', this.openMenu.bind(this));
    window.addEventListener('resize', this.resizeWindow.bind(this));
  }

  setAction(e) {
    // Find the closest <li> to the target
    const link = e.target.closest('li');

    // If it's a navbar item and the mobile menu is open, toggle to close it
    // Or toggle the menu if clicking the hamburger button
    if (
      (link &&
        link.classList.contains(`${NAVBAR_MENU_ITEM.replace('.', '')}`) &&
        this.mobileOpen) ||
      e.target.closest('button') === this.hamburgerMenu
    ) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    // ADD/REMOVE the open class
    this.menu.classList.toggle(this.cssOpen);
    this.mobileOpen = !this.mobileOpen;
    document.body.classList.toggle('no-scroll');
  }

  resizeWindow() {
    // If resize window to desktop size, remove the css open class
    if (document.documentElement.clientWidth >= MOBILE_BREAKPOINT)
      this.menu.classList.remove(this.cssOpen);
  }
}

export default MobileMenu;
