# Transferring Blog Posts

Grab blog posts from Big Commerce and send them to WordPress.

## Installation

Clone this repo to your local machine

```
git clone https://github.com/BrodSolutionsDev/transfer-blog-posts-from-bigcommerce-to-wordpress.git
```

## Usage

Before anything else, install the required packages

```
npm install
```

After the download finishes

1. Duplicate the .env.template file and rename it .env
2. Create an application password for the user on WordPress
3. Add the user's username, application password, the store hash of the Big Commerce store, the Big Commerce auth_token, and the WordPress url to the .env file

## Sending posts to WordPress

Run the following code to send the blog posts to WordPress. If done correctly, you'll see "Posted Successfully!" in the console for every post.

```
node index.js
```
