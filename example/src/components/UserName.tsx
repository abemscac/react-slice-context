import { FormEvent, useRef } from 'react'
import { useUserContext } from '../contexts/user-context'
import { RenderCount } from './RenderCount'

export const UserName = () => {
  const name = useUserContext((state) => state.name)

  const { setName } = useUserContext((_, dispatch) => dispatch)

  const input = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const { value } = input.current ?? {}
    if (value !== undefined) {
      setName(value)
    }
  }

  return (
    <div className="section">
      <RenderCount />
      <h2>User name: {name}</h2>
      <p>
        This component will only re-render when the <code>name</code> changes in{' '}
        <code>UserContext</code>.
      </p>
      <form onSubmit={onSubmit}>
        <input ref={input} defaultValue={name} />
        <button type="submit">Set Name</button>
      </form>
    </div>
  )
}
