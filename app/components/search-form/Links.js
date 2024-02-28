'use client'
import React, {useCallback} from 'react'
import {useSearchParams} from "next/navigation";
import Link from "next/link";

const Links = () => {
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            if (name && value) {
                params.set(name, value)
            }

            return params.toString()
        },
        [searchParams]
    )

    return <div>
        <Link href={`new?${createQueryString()}`}>
            <button type={'button'}>Add Movie</button>
        </Link>
    </div>
}

export default Links