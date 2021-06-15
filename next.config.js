// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: isDev
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  }
});
