import React from "react";

import './app-header.css';

const AppHeader = ({liked, allPosts})=>{

        let str = 'записей';
        if (allPosts%10 > 1 && allPosts%10 < 5 ) {
            str = 'записи';
        } else if(allPosts%10 === 1) {
            str = 'запись';
        }


    return (
        <div className='app-header d-flex'>
            <h1>Igor Vavilin</h1>
            <h2>Всего {allPosts} {str}, из них понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;