import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useUpdatePostMutation, useDeletePostMutation } from '../features/api/apiSlice'

const TodoItem = ({ data }) => {
  
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)

  const [updatePost] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()



  return (
    <div className="todo">
      <TextField onChange={(e) => { setTitle(e.target.value) }} value={title} fullWidth></TextField>
      <TextField onChange={(e) => { setDescription(e.target.value) }} value={description} sx={{ marginTop: 1 }} fullWidth ></TextField>
      <Button onClick={() => { updatePost({ ...data, title, description }) }} sx={{ marginTop: 1 }} variant="contained">Update</Button>
      <Button onClick={() => { deletePost({ id: data.id }) }} sx={{ marginTop: 1 }} variant="contained">DELETE</Button>
    </div>)
}

export default TodoItem