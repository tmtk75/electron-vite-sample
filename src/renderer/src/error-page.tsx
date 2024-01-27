import { useRouteError, ErrorResponse } from 'react-router-dom'

export default function ErrorPage(): JSX.Element {
  const error = useRouteError()
  console.error(error)
  if (!isErrorResponse(error)) {
    return <></>
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
      <a href="/">Go to home</a>
    </div>
  )
}

function isErrorResponse(v: unknown): v is ErrorResponse {
  if ((v as any).status && (v as any).statusText) {
    return true
  }
  return false
}
