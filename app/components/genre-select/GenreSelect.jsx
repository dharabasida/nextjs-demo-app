'use client'

import './GenreSelect.css';
import Link from 'next/link'
import {useCallback} from "react";
import {useSearchParams} from "next/navigation";

const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

function GenreSelect({urlPrefix}) {
    const searchParams = useSearchParams()

    const selectedGenre = searchParams.get('genre') || 'ALL'

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

    return (
        <div className="genre-background">
            <ul className="genre-container">
                {genres.map((genre) => (
                    <li key={genre}>
                        <Link href={`${urlPrefix}?${createQueryString('genre',genre)}`}>
                            <button data-testid="genre-select"
                                    className={genre === selectedGenre ? 'selected-button' : 'genre-button'}
                            >
                                {genre}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default GenreSelect;
