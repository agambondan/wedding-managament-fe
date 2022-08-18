export const GetPageLimitOffset = (context) => {
    if (context.query.page === undefined) {
        context.query.page = 1
    }
    if (context.query.limit === undefined) {
        context.query.limit = 5
    }
    let page = context.query.page
    let limit = context.query.limit
    const offset = +page === 1 ? 0 : (+page - 1) * limit
    return [page, limit, offset]
}

export const GetPage2LimitOffset = (context) => {
    if (context.query.page === undefined) {
        context.query.page = 1
    }
    if (context.query.limit === undefined) {
        context.query.limit = 5
    }
    let page = context.query.page
    let limit = context.query.limit
    const offset = +page === 1 ? 0 : (+page - 1) * limit
    return [page, limit, offset]
}