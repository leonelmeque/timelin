import { TodoProps, TodoStatus } from '@todo/commons';
import { selector } from 'recoil';
import { todoFilterState, todosState } from '../../atoms/todos.atom';

export const filterTodosByStatus = selector<TodoProps[]>({
  key: 'filterByStatus',
  get: ({ get }) => {
    const filter = get(todoFilterState);
    const list = get(todosState);

    function filteredData() {
      switch (filter) {
        case TodoStatus.ON_GOING:
          return list.filter((item) => item.status === TodoStatus.ON_GOING);
        case TodoStatus.COMPLETED:
          return list.filter((item) => item.status === TodoStatus.COMPLETED);
        case TodoStatus.TODO:
          return list.filter((item) => item.status === TodoStatus.TODO);
        case TodoStatus.ON_HOLD:
          return list.filter((item) => item.status === TodoStatus.ON_HOLD);
        default:
          return [];
      }
    }

    return filteredData();
  },
});
