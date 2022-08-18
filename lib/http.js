import axios from "axios";

export const HttpRequest = (request) => {
    const defaultHeaders = {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en",
        "Connection": "keep-alive",
    }
    if (request.headers === undefined) {
        request.headers = defaultHeaders
    } else {
        Object.keys(defaultHeaders).map((key) => {
            request.headers[key] = defaultHeaders[key]
        })
    }
    if (request.method === undefined) {
        request.method = "GET"
    }
    return axios({
        method: request.method,
        url: request.url,
        data: request.data,
        headers: request.headers,
        withCredentials: request.withCredentials,
    })
}

export const AuthService = (request) => {
    request.url = `${process.env.ENDPOINT_AUTH}/` + request.url
    return HttpRequest(request)
}

export const MasterService = (request) => {
    request.url = `${process.env.ENDPOINT_MASTER}/` + request.url
    return HttpRequest(request)
}

export const UserService = (request) => {
    request.url = `${process.env.ENDPOINT_USERS}/` + request.url
    return HttpRequest(request)
}