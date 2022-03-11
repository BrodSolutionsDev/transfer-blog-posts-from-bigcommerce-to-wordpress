const axios = require('axios').default;
const WPAPI = require('wpapi');
require('dotenv').config();

// Basic auth for WordPress API
const wp = new WPAPI({
  endpoint: `https://${process.env.WORDPRESS_URL}/wp-json`,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});

// Axios request options
const options = {
  method: 'GET',
  url: `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v2/blog/posts?limit=3`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': process.env.AUTH_TOKEN
  }
};

// Get blog posts from Big Commerce
axios
  .request(options)
  .then(function (response) {
    const wpPosts = []; // Array of posts to send to WordPress
    const posts = response.data; // Save the posts from BigCommerce to variable
    posts.forEach(post => {
      // Loop aover every post and add the post to the wpPosts array
      wpPosts.push({
        date: post.published_date.date,
        slug: post.url,
        status: post.is_published == true ? 'publish' : 'draft',
        password: '',
        title: post.title,
        content: post.body,
        author: 0,
        excerpt: post.summary,
        featured_media: 0,
        comment_status: 'closed',
        ping_status: 'open',
        format: 'standard',
        sticky: false,
        template: '',
        categories: [1],
        tags: null
      });
    });

    // Loop over the array of posts to send to WordPress
    wpPosts.forEach(post => {
      // POST the blog post to WordPress
      wp.posts()
        .create(post)
        .then(function (res) {
          console.log('Posted successfully!');
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  })
  .catch(function (error) {
    console.error(error);
  });
