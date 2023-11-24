import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Create() {
  const [subject, setSubject] = useState("");
  const [writer, setWriter] = useState("");
  const [regDate, setRegDate] = useState(new Date());
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    const requestData = {
      Subject: subject,
      Writer: writer,
      //RegDate: regDate,
      Content: content,
    };
    console.log("check:", requestData);

    try {
      const response = await axios.post(
        "/api/board/create",
        JSON.stringify(requestData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ maxWidth: 800, margin: "100px auto", padding: 20 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create Post
      </Typography>
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextField
        label="작성자"
        variant="outlined"
        fullWidth
        margin="normal"
        value={writer}
        onChange={(e) => setWriter(e.target.value)}
      />
      {/* <TextField
        label="날짜"
        variant="outlined"
        fullWidth
        margin="normal"
        value={regDate}
        disabled
        //onChange={(e) => setRegDate(e.target.value)}
      /> */}
      <TextField
        label="내용"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Divider style={{ margin: "20px 0" }} />
      <Button variant="contained" color="primary" onClick={handleCreatePost}>
        Create
      </Button>
      <Link to="/">
        <Button variant="contained" color="secondary">
          목록으로
        </Button>
      </Link>
    </Paper>
  );
}
