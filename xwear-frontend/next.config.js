const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

const nextConfig = {
  publicRuntimeConfig: {
    backendUrl: "http://localhost:3001",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      }
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

};

/** @type {import('next').NextConfig} */
module.exports = withMDX(nextConfig);
