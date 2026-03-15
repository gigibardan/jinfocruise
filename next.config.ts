const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      { protocol: "https", hostname: "assets.msccruises.com" },
      { protocol: "https", hostname: "www.msccruises.com" },
    ],
  },
};

export default nextConfig;