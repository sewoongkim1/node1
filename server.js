import express from "express";

const app = express();
const port = 3000;

// EJS를 View Engine으로 설정
app.set("view engine", "ejs");
app.set("views", "./views");

// 샘플 데이터
const users = [
  { id: 1, name: "Kim", role: "Admin" },
  { id: 2, name: "Lee", role: "User" },
  { id: 3, name: "Park", role: "Manager" }
];

// 홈
app.get("/", (req, res) => {
  res.render("index", {
    title: "EJS Sample",
    message: "Hello from Node + EJS",
    users
  });
});

// 사용자 목록
app.get("/users", (req, res) => {
  res.render("users", { users });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
