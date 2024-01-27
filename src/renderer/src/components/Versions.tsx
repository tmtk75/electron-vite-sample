import { trpc } from '../trpc'

function Versions(): JSX.Element {
  const v = trpc.electron.versions.useQuery()
  if (!v.isFetched || !v.data) {
    return <></>
  }
  const versions = v.data

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
