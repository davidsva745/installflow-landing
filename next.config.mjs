/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/installflow-landing",
        assetPrefix: "/installflow-landing/",
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
