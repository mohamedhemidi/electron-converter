import { useState } from 'react'
import './assets/App.css'

function App(): JSX.Element {
  const [feets, setFeets] = useState(0)
  const [inches, setInches] = useState(0)
  const [result, setResult] = useState(null)

  const handleConvert = (e): void => {
    e.preventDefault()
    window.electron.ipcRenderer.send('convert-length-request', { feets, inches })

    const handleResponse = (results): void => {
      setResult(results)
    }
    window.electron.ipcRenderer.on('convert-length-response', handleResponse)
  }
  const handleReset = (e): void => {
    e.preventDefault()
    setFeets(0)
    setInches(0)
    setResult(null)
  }
  return (
    <div className="mainWrapper">
      <h1 className="title">Converter</h1>
      <form className="convert_form">
        <div className="form_group">
          <input
            type="text"
            name="feets"
            value={feets}
            className="textInput"
            onChange={(e) => setFeets(parseInt(e.target.value))}
          />
          <span className="unit">ft</span>
        </div>
        <div className="form_group">
          <input
            type="text"
            name="inches"
            value={inches}
            className="textInput"
            onChange={(e) => setInches(parseInt(e.target.value))}
          />
          <span className="unit">in</span>
        </div>
        <div className="action_buttons">
          <button onClick={(e) => handleConvert(e)}>Convert</button>
          <button onClick={(e) => handleReset(e)}>Reset</button>
        </div>
      </form>
      <div className="result">
        <h3>{result !== null ? result : 0}</h3>
        <span className="result_unit">CM</span>
      </div>
    </div>
  )
}

export default App
