export const formatDate = (string) => {
    let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(string).toLocaleDateString([], options);
}

export const formatSubString = (str) => {
    if (str.length >= 480) {
        return str.substring(0, str.length/3) + " ...."
    } else {
        return str
    }
}

export const toTitles = (s) => {
    return s.replace(/\w\S*/g, function (t) {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
}

