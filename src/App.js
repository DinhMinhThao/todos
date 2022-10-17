import React, { useState, useEffect } from "react";
import baseApi from "./doing/api";
import ListtingTodo from "./ListtingTodo";

function App() {
  const [load, loadSet] = useState(true);
  const [todos, todosSet] = useState([
    { id: 1, todo: "Học ReactJS", priority: "Hight", complate: false },
    { id: 2, todo: "Học JavaScript", priority: "Medium", complate: false },
    { id: 3, todo: "Học HTML , CSS", priority: "Medium", complate: false },
  ]);
  const [user, userSet] = useState({
    id: 0,
    todo: "",
    priority: "Low",
    complate: false,
  });
  useEffect(() => {
    loadSet(true);
    baseApi
      .get("/todos")
      .then((data) => {
        todosSet(data.data);
        loadSet(false);
      })
      .catch((error) => {
        console.log("error", error);
        loadSet(false);
      });
  }, []);

  const changeVale = (e) => {
    const { name, value } = e.target;
    userSet({
      ...user,
      id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
      [name]: value,
      complate: false,
    });
  };

  const handleSunmit = (e) => {
    e.preventDefault();
    baseApi.post("/todos", user);
    todosSet([...todos, user]);
  };

  if (load) return <h1>Loadding...</h1>;
  return (
    <div className="App">
      <form className="form" onSubmit={handleSunmit}>
        <label htmlFor="todo">Nhập công việc</label>
        <input
          minLength={2}
          name="todo"
          onChange={changeVale}
          id="todo"
          type={"text"}
        />
        <select defaultValue={"Low"} name="priority" onChange={changeVale}>
          <option value={"Hight"}>Hight</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Low"}>Low</option>
        </select>
        <input className="btn" type={"submit"} value={"Thêm"} />
      </form>
      <div className="grup-todo">
        {todos &&
          todos?.map((a) => (
            <ListtingTodo
              todos={todos}
              todosSet={todosSet}
              key={a.id}
              todo={a}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
