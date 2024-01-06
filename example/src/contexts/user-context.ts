import { createSliceContext } from '../../../src'

export type IUserState = {
  id: number
  name: string
}

export const { useContext: useUserContext } = createSliceContext({
  state: () => {
    const state: IUserState = {
      id: 1,
      name: 'Default User',
    }
    return state
  },
  dispatch: (user) => ({
    incrementId: () => {
      user.id++
    },
    setName: (name: string) => {
      user.name = name
    },
  }),
})
