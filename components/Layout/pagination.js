import Link from "next/link";
import {NextIcon, PreviousIcon} from "../../utils/icons";


export const Pagination = ({pathname, limit, page, lastPage}) => {
    let prev = page === 1 ? `${pathname}` : `${pathname}?page=${page - 1}${limit}`
    prev = page > lastPage ? `${pathname}?page=${page - 1}${limit}` : prev
    let next = page >= lastPage ? `${pathname}?page=${page + 1}${limit}` : `${pathname}?page=${page + 1}${limit}`
    return (
        <div className="w-full flex items-center">
            <Link href={prev} as={prev}>
                <a className={page === 1 ? 'disabled-link w-1/2 bg-white shadow hover:shadow-lg text-center p-4' : 'w-1/2 bg-white shadow hover:shadow-lg text-center p-4'}>
                    <p className="text-lg text-blue-800 font-bold flex items-center justify-center"><PreviousIcon/>Prev
                    </p>
                </a>
            </Link>
            <Link href={next} as={next}>
                <a className={page >= lastPage ? 'disabled-link w-1/2 bg-white shadow hover:shadow-lg text-center p-4' : 'w-1/2 bg-white shadow hover:shadow-lg text-center p-4'}>
                    <p className="text-lg text-blue-800 font-bold flex items-center justify-center">Next<NextIcon/>
                    </p>
                </a>
            </Link>
        </div>
    )
}