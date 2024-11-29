import React from 'react';
import { Button, Popconfirm } from 'antd';

const DeleteArticleButton = ({onDeleteClick, slug}) => (
  <Popconfirm
    title="Delete the article"
    description="Are you sure to delete this article?"
    onConfirm={() => onDeleteClick(slug)}
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);
export default DeleteArticleButton;