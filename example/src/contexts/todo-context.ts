import { createSliceContext } from '../../../src'
import { wait } from '../utils/wait'

export type ITodoState = {
  loading: boolean
  tasks: ITask[]
}

export type ITask = {
  name: string
  done: boolean
}

export const { useContext: useTodoContext, dispatch: todoDispatch } =
  createSliceContext({
    state: (): ITodoState => ({
      loading: true,
      tasks: [],
    }),
    dispatch: (state) => ({
      loadTasks: async () => {
        state.loading = true
        // Wait for 1.5 seconds to simulate network latency.
        await wait(1500)
        state.tasks = [
          {
            name: 'Very important task',
            done: true,
          },
          {
            name: 'Not that important task',
            done: false,
          },
          {
            name: 'Task',
            done: false,
          },
        ]
        state.loading = false
      },
      addTask: (name: string): void => {
        state.tasks.push({
          name,
          done: false,
        })
      },
      toggleDone: (index: number): void => {
        const task = state.tasks[index]
        if (task) {
          task.done = !task.done
        }
      },
      removeTask: (index: number): void => {
        state.tasks.splice(index, 1)
      },
      clear: () => {
        state.tasks = []
      },
    }),
  })
