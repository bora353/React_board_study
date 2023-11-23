import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Board() {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/board");
        setBoardData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ marginLeft: "200px", marginRight: "200px", marginTop: "100px" }}
    >
      <Link to="/create">
        <Button variant="contained" color="primary">
          글쓰기
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>No</th>
            <th style={{ width: "50%" }}>제목</th>
            <th style={{ width: "10%" }}>작성자</th>
            <th style={{ width: "20%" }}>등록일</th>
            <th style={{ width: "10%" }}>조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <Link to={`/view/${item.id}`}>{item.subject}</Link>
              </td>

              <td>{item.writer}</td>
              <td>{item.regDate}</td>

              <td>{item.readCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
