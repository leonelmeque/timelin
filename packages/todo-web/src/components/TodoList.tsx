import { ComponentPropsWithoutRef, VoidFunctionComponent } from "react";
import styled from "styled-components";

interface TodoListProps extends ComponentPropsWithoutRef<"div"> {
  todos: [];
}

const _TodoList: VoidFunctionComponent<TodoListProps> = ({ todos }) => {
  return <div>
    <h1>Todo</h1>
    <ul>{todos.map(() => [])}</ul>
  </div>;
};

const TodoList = styled(_TodoList)``;

export default TodoList;
