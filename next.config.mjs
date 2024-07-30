/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
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
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",

        pathname: "/*",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/bhn8xrk7f/**",
      },
    ],
  },
};

export default nextConfig;
