/** @type {import('next').NextConfig} */
const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = {
  reactStrictMode: true,
  env: {
    SOCKET_URL: 'http://localhost:9000',
  },
}

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'public'),
  webpack(config, options) {
    return config
  }
})