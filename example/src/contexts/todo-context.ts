import { createSliceContext } from '../../../src'

export type ITodoState = {
  tasks: ITask[]
}

export type ITask = {
  name: string
  done: boolean
}

export const { useContext: useTodoContext } = createSliceContext({
  state: () => {
    const state: ITodoState = {
      tasks: [],
    }
    return state
  },
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
})
