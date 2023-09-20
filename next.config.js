/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io']
    },
    experimental: {
        serverActions: true, // Enable Server Actions feature
    },
    webpack: (config, { isServer }) => {
        // Add the node-loader rule for binary modules
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });

        return config;
    },
};

module.exports = nextConfig;
