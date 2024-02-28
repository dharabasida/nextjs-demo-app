'use client'

import React, {useCallback} from 'react';
import './SortControl.css'; // Import the CSS file
import {useRouter} from 'next/navigation'
import {useSearchParams} from "next/navigation";

const SortControl = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const sortCriterion = searchParams.get('sort') || 'release_date';

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

    const handleSortChange = (e) => {
        const newSelection = e.target.value;
        router.push(`/?${createQueryString('sort', newSelection)}`)
    };


    return (
        <div className="sort-control">
            <label htmlFor="sortSelect">Sort by:</label>
            <select
                id="sortSelect"
                defaultValue={sortCriterion}
                onChange={handleSortChange}
            >
                <option value="release_date" data-testid="sort-control">Release Date</option>
                <option value="title">Title</option>
            </select>
        </div>
    );
};

export default SortControl;
