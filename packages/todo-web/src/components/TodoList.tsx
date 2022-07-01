import { ComponentPropsWithoutRef, VoidFunctionComponent } from "react";
import styled from "styled-components";

interface TodoListProps extends ComponentPropsWithoutRef<'div'>{
    todos:[]
}
 
const _TodoList: VoidFunctionComponent<TodoListProps> = ({ todos }) => {
    return <ul>{todos.map(() => [])}</ul>;
};

const TodoList = styled(_TodoList)`
    
`
 
export default TodoList;