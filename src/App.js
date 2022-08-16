import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { useGetPostsQuery, useAddPostMutation } from "./features/api/apiSlice"


const TodoList = ({ data }) => {
  return (<Grid className="item" item xs={12}>
    {data.map(row => {
      return (<TodoItem key={row.id} data={row} />)
    })}
  </Grid>)
}

function App() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  const [addPost] = useAddPostMutation()



  const handleAddPost = () => {
    addPost({ title, description })

    setTitle("")
    setDescription("")
  }

  let content = ""
  if (isLoading) {
    content = "loading"
  }

  if (isError) {
    content = "err"
  }

  if (isSuccess) {
    content = <TodoList data={data} />
  }


  return (
    <>
      <Grid container gap={1}>

        <Grid className="item" item xs={12}>
          <TextField onChange={(e) => { setTitle(e.target.value) }} value={title} variant="outlined" label="title" fullWidth />
          <TextField onChange={(e) => { setDescription(e.target.value) }} value={description} sx={{ marginTop: 1 }} variant="outlined" label="description" fullWidth />
          <Button onClick={handleAddPost} sx={{ marginTop: 1 }} variant="contained" >Add Post</Button>
        </Grid>

        {content}

      </Grid>
    </>
  );
}

export default App;
