import React from 'react';

import PostListItem from "../post-list-item";
import {ListGroup, ListGroupItem} from 'reactstrap';

import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    let elements = posts.filter(item => typeof item === 'object' && Object.entries(item).length !== 0)
                        .map((item) => {
                             const {id, ...itemProps} = item;
                            return (
                                <ListGroupItem key={id}>
                                    <PostListItem {...itemProps}
                                    onDelete={() => onDelete(id)}
                                    onToggleImportant={() => onToggleImportant(id)}
                                    onToggleLiked={()=>onToggleLiked(id)}/>
                                </ListGroupItem>
                            )
                        });

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;
