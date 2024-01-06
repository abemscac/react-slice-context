import { useUserContext } from '../contexts/user-context'
import { RenderCount } from './RenderCount'

export const UserId = () => {
  const userId = useUserContext((state) => state.id)

  const { incrementId } = useUserContext((_, dispatch) => dispatch)

  return (
    <div className="section">
      <RenderCount />
      <h2>User ID: {userId}</h2>
      <p>
        This component will only re-render when the <code>id</code> changes in{' '}
        <code>UserContext</code>.
      </p>
      <button onClick={incrementId}>Increment ID</button>
    </div>
  )
}
