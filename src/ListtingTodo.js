import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import baseApi from "./doing/api";
import { useState } from "react";

const ListtingTodo = (props) => {
  const { todo, todos, todosSet } = props;
  const [done, doneSet] = useState(todo.complate);
  const [edit, editSet] = useState(false);
  const [nameTodo, nameTodoSet] = useState(todo.todo);

  const handleDeleteTodo = (id) => {
    baseApi.delete(`/todos/${id}`);
    todosSet(todos.filter((a) => a.id !== id));
  };
  const handleTogerTodo = (id) => {
    baseApi.put(`/todos/${id}`, {
      ...todo,
      complate: done,
    });
    todosSet(
      todos.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            complate: done,
          };
        }
        return a;
      })
    );
  };
  const HandleEditTodo = (id) => {
    if (edit) {
      baseApi.put(`/todos/${id}`, {
        ...todo,
        todo: nameTodo,
      });
      todosSet(
        todos.map((a) => {
          if (a.id === id) {
            return {
              ...a,
              todo: nameTodo,
            };
          }
          return a;
        })
      );
    }
  };

  return (
    <div className="item">
      <div className="item-padding">
        <div className="item-padding-1">
          <div className="item-1">
            {todo.complate ? (
              <span className="done">
                Tên công việc:{" "}
                {edit ? (
                  <div>
                    <input
                      className="input-edit"
                      type={"text"}
                      minLength={2}
                      placeholder="Đổi tên"
                      onChange={(e) => nameTodoSet(e.target.value)}
                    />
                  </div>
                ) : (
                  todo.todo
                )}{" "}
                Hoàn thành
              </span>
            ) : (
              <span className="undon">
                Tên công việc:
                {edit ? (
                  <div>
                    <input
                      className="input-edit"
                      type={"text"}
                      minLength={2}
                      placeholder="Đổi tên"
                      onChange={(e) => nameTodoSet(e.target.value)}
                    />
                  </div>
                ) : (
                  todo.todo
                )}
              </span>
            )}
            <span>{todo.priority}</span>
          </div>
          <div className="btn-grup">
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteForeverIcon />
            </button>
            <button
              onClick={() => {
                doneSet(!done);
                handleTogerTodo(todo.id);
              }}
            >
              <DoneIcon />
            </button>
            <button
              onClick={() => {
                editSet(!edit);
                HandleEditTodo(todo.id);
              }}
            >
              {edit ? "Đổi" : <BorderColorIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListtingTodo;
