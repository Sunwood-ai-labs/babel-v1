/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },
}

module.exports = nextConfig