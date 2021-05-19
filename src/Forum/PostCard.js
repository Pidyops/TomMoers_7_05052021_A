import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';

const PostCard = ({ post, handleDeletePost, handlePutPost }) => {
    console.log(post)
    return (
        <div>
        <Card elevation={2}>
            <CardHeader 
                action={
                    <IconButton aria-label="modify or delete">
                        <EditOutlined />
                        {/* <EditOutlined onClick={() => handlePutPost(post.id)} /> */}
                        <DeleteOutlined onClick={() => handleDeletePost(post.id)} />
                      
                    </IconButton>
                }
                title='name'
                subheader='date'
            />
            <CardContent>
                { post.title }
                <Typography variant='body2' component="p">
                { post.description}
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
}

export default PostCard
