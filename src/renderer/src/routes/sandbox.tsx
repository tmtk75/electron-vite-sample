import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'

export function Sandbox(): JSX.Element {
  return (
    <div>
      <h1>Sandbox</h1>
      <div>
        <li>
          <Link to="/">Go to home</Link>
        </li>
      </div>
      <div>
        <TextField label="Standard" />
      </div>
    </div>
  )
}
