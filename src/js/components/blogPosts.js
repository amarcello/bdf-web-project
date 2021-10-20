'use strict';

import SimpleData from './simpleData';

class BlogPosts {
  constructor() {
    this.posts = [];

    // Get the blog wrapper element
    this.postsWrapper = document.querySelector('.blog');

    // Initiate posts rendering
    this.getPosts();
  }

  async getPosts() {
    // If there's not blog wrapper available, return
    if (!this.postsWrapper) return;

    // Start a request to receive the data from Firebase
    const request = new SimpleData('posts');
    const response = await request.getData();

    // If there aren't posts, return
    if (!response) {
      // (In a real world scenario, here we'd have a proper error handling and the possibility for the user to try loading the posts again)
      console.error('There was an error, reload the page to try again');
      return;
    }

    // Convert the response object into an array, extracting only the post content
    this.posts = Object.entries(response).map(post => post[1]);

    // Clean the wrapper element to replace the loading spinner with the posts
    this.postsWrapper.innerHTML = '';

    // Start rendering the cards for each posts
    this.posts.forEach(post => this.createCard(post));
  }

  postDate(date) {
    // Convert date format based on locale
    const convertDate = new Date(date);
    return convertDate.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  createCard(post) {
    // The default card for the blog post
    const blogCard = () => {
      return `<div class="card-blog-content">
        <p class="card-blog-meta mrgn-bottom-25">${this.postDate(
          post.datetime
        )}<br /><span class="label">${post.category}</span></p>
        <h3 class="card-blog-title">${post.title}</h3>
      </div>`;
    };

    // The card variation for the quote post
    const quoteCard = () => {
      return `<p class="card-blog-quote flex-fill text-right color-primary">
        <i class="fas fa-quote-right fa-lg"></i>
      </p>
      <div class="card-blog-content">
        <h3 class="card-blog-title mrgn-bottom-25">"${post.title}"</h3>
        <p class="h3">&mdash; ${post.author}</p>
      </div>`;
    };

    // The card variation for the video post
    const videoCard = () => {
      return `<div class="card-blog-content">
        <span class="card-blog-icon">
          <i class="fa fa-play"></i>
        </span>
        <p class="card-blog-meta mrgn-bottom-25">${this.postDate(
          post.datetime
        )}<br /><span class="label">${post.category}</span></p>
        <h3 class="card-blog-title">${post.title}</h3>
      </div>`;
    };

    // The full card markup
    const card = `
      <a class="card-blog"
        href="${post.url}"
        rel="noreferrer"
        target="_blank"
        title="Blog post - ${post.title}"
        aria-label="Blog post - ${post.title}">
          <div class="card-blog-image" style="background-image:url('dist/images/blog/${
            post.image
          }')"></div>
          ${
            post.isVideo ? videoCard() : post.isQuote ? quoteCard() : blogCard()
          }
      </a>
    `;

    // Add the card to the blog wrapper
    this.postsWrapper.insertAdjacentHTML('beforeend', card);
  }
}

export default BlogPosts;
