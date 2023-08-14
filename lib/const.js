import React from "react";

export const adminNavbarMenu = [
    {"link": "/admin/support", "path": "/support", "name": "Support", "icon": "fas fa-tachometer-alt fa-1x fa-fw"},
    {"link": "/admin/account", "path": "/account", "name": "My Account", "icon": "fas fa-tachometer-alt fa-1x fa-fw"},
]

export const adminMasterMenu = [
    {"link": "/admin/city", "path": "/admin/city", "name": "City", "icon": "fas fa-city fa-1x fa-fw"},
    {"link": "/admin/discount", "path": "/admin/discount", "name": "Discount", "icon": "fa-solid fa-tags fa-1x fa-fw"},
    {"link": "/admin/event", "path": "/admin/event", "name": "Event", "icon": "fa-solid fa-cake-candles fa-1x fa-fw"},
    {"link": "/admin/feature", "path": "/admin/feature", "name": "Feature", "icon": "fa-brands fa-think-peaks fa-1x fa-fw"},
    {"link": "/admin/gender", "path": "/admin/gender", "name": "Gender", "icon": "fa-solid fa-venus-mars fa-1x fa-fw"},
    {
        "link": "/admin/multimedia-type",
        "path": "/admin/multimedia-type",
        "name": "Multimedia Type",
        "icon": "fa-solid fa-compact-disc fa-1x fa-fw"
    },
    {
        "link": "/admin/name-prefix",
        "path": "/admin/name-prefix",
        "name": "Name Prefix",
        "icon": "fa-solid fa-signature fa-1x fa-fw"
    },
    {"link": "/admin/packet", "path": "/admin/packet", "name": "Packet", "icon": "fa-solid fa-boxes-packing fa-1x fa-fw"},
    {"link": "/admin/religion", "path": "/admin/religion", "name": "Religion", "icon": "fa-solid fa-hands-praying fa-1x fa-fw"},
    {"link": "/admin/province", "path": "/admin/province", "name": "Province", "icon": "fa-solid fa-globe fa-1x fa-fw"},
    {"link": "/admin/theme", "path": "/admin/theme", "name": "Theme", "icon": "fa-solid fa-brush fa-1x fa-fw"},
]

export const adminUserMenu = [
    {"link": "/admin/users", "path": "/admin/users", "name": "Users", "icon": "fas fa-users fa-1x fa-fw"},
    {"link": "/admin/users/packet", "path": "/admin/users/packet", "name": "Packet", "icon": "fas fa-city fa-1x fa-fw"},
]

export const adminMobileMenu = adminMasterMenu.concat(adminUserMenu)

export const clientUserMenu = [
    {"link": "/client/profile", "path": "/client/profile", "name": "Profile", "icon": "fa-user-group fa-solid"},
    {"link": "/client/event", "path": "/client/event", "name": "Event", "icon": "fa-calendar fa-solid"},
    {"link": "/client/guest", "path": "/client/guest", "name": "Guest", "icon": "fa-rectangle-list fa-solid"},
    {"link": "/client/gallery", "path": "/client/gallery", "name": "Gallery", "icon": "fa-film fa-solid"},
    {"link": "/client/story", "path": "/client/story", "name": "Story", "icon": "fa-pen fa-solid"},
    {"link": "/client/quote", "path": "/client/quote", "name": "Quote", "icon": "fa-message fa-solid"},
    {"link": "/client/theme", "path": "/client/theme", "name": "Theme", "icon": "fa-palette fa-solid"},
    {"link": "/client/gift", "path": "/client/gift", "name": "Gift", "icon": "fa-gift fa-solid"},
    {"link": "/client/upgrade", "path": "/client/upgrade", "name": "Upgrade", "icon": "fa-star fa-solid"},
    {"link": "/client/setting", "path": "/client/setting", "name": "Setting", "icon": "fa-screwdriver-wrench fa-solid"},
]

export const AdminContext = React.createContext({});
export const ClientContext = React.createContext({});
export const Authorization = React.createContext({});