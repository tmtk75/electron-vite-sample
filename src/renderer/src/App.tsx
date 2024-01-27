import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { Link } from 'react-router-dom'
import { trpc } from './trpc'

function App(): JSX.Element {
  const userList = trpc.user.userList.useQuery()
  const create = trpc.user.userCreate.useMutation()
  if (!userList.isFetched) {
    return <></>
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a
            target="_blank"
            rel="noreferrer"
            onClick={async () => {
              const v = await create.mutateAsync({ name: 'test', time: new Date() })
              console.debug(`userCreate`, v)
            }}
          >
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>

      <div>
        <div>{location.href}</div>
        <ul>
          <li>
            <Link to="/contacts/1">contacts/1</Link>
          </li>
          <li>
            <Link to="/sandbox">sandbox</Link>
          </li>
        </ul>
        <ol>
          {userList.data?.map((user) => {
            return (
              <li key={user.id}>
                {user.id}: {user.name}
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}

export default App
