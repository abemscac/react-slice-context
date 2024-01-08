import { createSliceContext } from '../../../src'

export type ITodoState = {
  tasks: ITask[]
}

export type ITask = {
  name: string
  done: boolean
}

const TASKS_STORAGE_KEY = 'tasks'

const computeDefaultTasks = (): ITask[] => {
  const serializedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
  if (serializedTasks) {
    try {
      const tasks = JSON.parse(serializedTasks)
      return tasks
    } catch {
      // Do nothing here.
    }
  }
  return []
}

export const { useContext: useTodoContext, dispatch: todoDispatch } =
  createSliceContext({
    state: (): ITodoState => ({
      tasks: computeDefaultTasks(),
    }),
    dispatch: (state) => ({
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
    plugins: [
      {
        onStateInit: (state) => {
          const { tasks } = state
          if (tasks.length) {
            console.log('Tasks loaded from localStorage: ', tasks)
          }
        },
        onChange: (state) => {
          localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks))
        },
      },
    ],
  })
