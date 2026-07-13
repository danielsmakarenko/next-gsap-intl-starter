import createNextIntlPlugin from "next-intl/plugin";

// Tell next-intl where request.ts is
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default withNextIntl(nextConfig);
