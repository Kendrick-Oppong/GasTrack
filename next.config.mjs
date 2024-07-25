/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    remotePatterns: [
     
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },};

export default nextConfig;
