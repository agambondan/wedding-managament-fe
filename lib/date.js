export function addLeadingZeros(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}

export function FormatDate(currentDatetime) {
    return currentDatetime.getFullYear() + "-" + addLeadingZeros(currentDatetime.getMonth() + 1) + "-" + addLeadingZeros(currentDatetime.getDate()) + " " + addLeadingZeros(currentDatetime.getHours() - 7) + ":" + addLeadingZeros(currentDatetime.getMinutes()) + ":" + addLeadingZeros(currentDatetime.getSeconds())
}