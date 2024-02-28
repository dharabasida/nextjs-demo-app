// import React, { useState, useEffect } from 'react';
import './SearchForm.css';

import React from "react";
import Links from '@/app/components/search-form/Links';
import Form from '@/app/components/search-form/Form';
import ModalDialog from '@/app/components/modal-dialog/ModalDialog';
import MovieListPage from '@/app/components/movie-list-page/MovieListPage';


const SearchForm = ({params, searchParams}) => {


    // const [visible, setvisible] = useState(false);
    // const [modalComponent, setModalComponent] = useState({title: '', children: null});


    return (
        <div>
            <Links/>
            {/*TODO Refactor ModalDialog*/}
            {/*{*/}
            {/*    visible && <ModalDialog title={modalComponent.title} onClose={() => setvisible(false)}>*/}
            {/*        {modalComponent.children}*/}
            {/*    </ModalDialog>*/}
            {/*}*/}
            <Form/>


            <MovieListPage searchParams={searchParams}/>

        </div>
    )


}

export default SearchForm;