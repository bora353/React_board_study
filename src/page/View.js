import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function View() {
  const [boardDetail, setBoardDetail] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${id}`);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/board/${id}`);
        setBoardDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(`/api/board/${id}`);

        console.log("Post deleted:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ maxWidth: 800, margin: "100px auto", padding: 20 }}
    >
      <Link to={`/update/${id}`}>수정하기</Link>
      <br></br>
      <button onClick={handleDelete}>삭제하기</button>

      <Typography variant="h4" align="center" gutterBottom>
        {boardDetail.subject}
      </Typography>
      <Typography variant="subtitle1" align="right" gutterBottom>
        작성자: {boardDetail.writer}
      </Typography>
      <Typography variant="subtitle1" align="right" gutterBottom>
        등록일: {new Date(boardDetail.regDate).toLocaleString("ko-KR")}
      </Typography>
      <Typography variant="subtitle1" align="right" gutterBottom>
        조회수: {boardDetail.readCount}
      </Typography>
      <Divider style={{ margin: "20px 0" }} />
      <Typography variant="body1">{boardDetail.content}</Typography>
    </Paper>
  );
}
