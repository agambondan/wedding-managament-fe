/** @type {import('next').NextConfig} */
const path = require('path')
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
    }
}