/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io']
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
