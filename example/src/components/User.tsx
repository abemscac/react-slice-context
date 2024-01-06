import { useUserContext } from '../contexts/user-context'
import { RenderCount } from './RenderCount'

export const User = () => {
  const user = useUserContext()

  return (
    <div className="section">
      <RenderCount />
      <h2>User: {JSON.stringify(user)}</h2>
      <p>
        This component will re-render whenever there's a change in{' '}
        <code>UserContext</code>.
      </p>
    </div>
  )
}
