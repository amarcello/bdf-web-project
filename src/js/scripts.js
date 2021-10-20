import { NAVBAR_SELECTOR } from './config/settings';

import BlogPost from './components/blogPosts';
import MobileMenu from './components/mobileMenu';
import ScrollWatch from './components/scrollWatch';
import StickyNavbar from './components/stickyNavbar';

new BlogPost();
new MobileMenu(NAVBAR_SELECTOR, 'navigation-open', '.navigation-hamburger');
new ScrollWatch();
new StickyNavbar();
