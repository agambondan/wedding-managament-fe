export const navbarMenu = [
    {"link": "/admin/support", "path": "/support", "name": "Support", "icon": "fas fa-tachometer-alt fa-1x"},
    {"link": "/admin/account", "path": "/account", "name": "My Account", "icon": "fas fa-tachometer-alt fa-1x"},
]

export const masterMenu = [
    {"link": "/admin/city", "path": "/admin/city", "name": "City", "icon": "fas fa-city fa-1x"},
    {"link": "/admin/discount", "path": "/admin/discount", "name": "Discount", "icon": "fa-solid fa-tags fa-1x"},
    {"link": "/admin/event", "path": "/admin/event", "name": "Event", "icon": "fa-solid fa-cake-candles fa-1x"},
    {"link": "/admin/feature", "path": "/admin/feature", "name": "Feature", "icon": "fa-brands fa-think-peaks fa-1x"},
    {"link": "/admin/gender", "path": "/admin/gender", "name": "Gender", "icon": "fa-solid fa-venus-mars fa-1x"},
    {
        "link": "/admin/multimedia-type",
        "path": "/admin/multimedia-type",
        "name": "Multimedia Type",
        "icon": "fa-solid fa-compact-disc"
    },
    {
        "link": "/admin/name-prefix",
        "path": "/admin/name-prefix",
        "name": "Name Prefix",
        "icon": "fa-solid fa-signature"
    },
    {"link": "/admin/packet", "path": "/admin/packet", "name": "Packet", "icon": "fa-solid fa-boxes-packing fa-1x"},
    {"link": "/admin/religion", "path": "/admin/religion", "name": "Religion", "icon": "fa-solid fa-hands-praying fa-1x"},
    {"link": "/admin/province", "path": "/admin/province", "name": "Province", "icon": "fa-solid fa-globe fa-1x"},
    {"link": "/admin/theme", "path": "/admin/theme", "name": "Theme", "icon": "fa-solid fa-brush fa-1x"},
]

export const userMenu = [
    {"link": "/admin/users", "path": "/admin/users", "name": "Users", "icon": "fas fa-users fa-1x"},
    {"link": "/admin/users/packet", "path": "/admin/users/packet", "name": "Packet", "icon": "fas fa-city fa-1x"},
]

export const mobileMenu = masterMenu.concat(userMenu.concat(navbarMenu))
