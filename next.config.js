/** @type {import('next').NextConfig} */
const path = require('path')
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
require('dotenv').config()

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: true,
            },
        ]
    },
    require: ("tinymce/tinymce"),
    reactStrictMode: false, // false for not render twice
    swcMinify: true,
    env: {
        IP: process.env.IP,
        ENDPOINT_MASTER: `${process.env.IP}/api/v1/master`,
        ENDPOINT_USERS: `${process.env.IP}/api/v1/users`,
        ENDPOINT_AUTH: `${process.env.IP}/api/v1/auth`,
    },
    future: {
        webpack5: true,
    },
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "node_modules/tinymce/skins"),
                        to: path.join(__dirname, "public/assets/libs/tinymce/skins"),
                    },
                    {
                        from: path.join(__dirname, "node_modules/tinymce/themes"),
                        to: path.join(__dirname, "public/assets/libs/tinymce/themes"),
                    },
                    {
                        from: path.join(__dirname, "node_modules/tinymce/icons"),
                        to: path.join(__dirname, "public/assets/libs/tinymce/icons"),
                    },
                ],
            })
        );
        return config;
    },
    webpackDevMiddleware: (config) => {
        return config;
    },
}