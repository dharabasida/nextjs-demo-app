'use client'

import React, {useState} from "react";
import Link from 'next/link'

const ContextMenu = ({movieId, queryParams}) => {
    const [isContextMenuOpen, setContextMenuOpen] = useState(false);


    const toggleContextMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setContextMenuOpen(!isContextMenuOpen);
    };

    return <div className="context-menu">
        <button className="context-menu-button" onClick={toggleContextMenu}>
            <span>&#8942;</span>
        </button>
        {isContextMenuOpen && (
            <ul className="menu-list">
                <Link href={`/${movieId}/edit?${queryParams}`}>
                    <li>
                        Edit
                    </li>
                </Link>
                {/*TODO OnDelete*/}
                <li onClick={(e) => {
                    setContextMenuOpen(false);
                    // onDeleteClick(e);
                }}>Delete
                </li>
            </ul>
        )}
    </div>
}

export default ContextMenu