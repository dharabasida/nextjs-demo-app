'use client'
import React, {useCallback} from 'react'
import {useRouter, useSearchParams} from "next/navigation";
const Form = ()=> {
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchQuery=searchParams.get('search')||'';

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
    const handleSearch = (e) => {
        e.preventDefault()
        const newSearchQuery = e.target[0].value
        if (newSearchQuery) {
            const currentSearchParams = new URLSearchParams(searchParams);
            router.push('/?' + createQueryString('search', newSearchQuery))
        } else {
            router.push('/')
        }
    }

    return <form onSubmit={handleSearch}  action={'/'} method={'get'} className="search-container">
        <input
            type="text"
            name={'search'}
            placeholder="What do you want to watch?"
            defaultValue={searchQuery}
            data-testid="search-input"
        />
        <button data-testid="search-button" type={'submit'}>Search</button>
    </form>
}

export default Form