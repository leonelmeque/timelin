import { TodoProps } from '@todo/commons';
import { selectorFamily } from 'recoil';
import { todosState } from '../../atoms/todos.atom';

export const filterTodosByQuery = selectorFamily<
  TodoProps[],
  { query: string }
>({
  key: 'filterByQuery',
  get:
    ({ query }) =>
      ({ get }) => {
        const list = get(todosState);

        function filteredData() {
          return list.filter(
            (item) =>
              item.todo.toLocaleLowerCase().indexOf(query.toLowerCase()) > -1 ||
              item.description.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        return !query ? [] : filteredData();
      },
});
