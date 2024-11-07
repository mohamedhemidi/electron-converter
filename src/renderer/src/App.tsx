import { useEffect, useState } from 'react'
import './assets/App.css'

const dikrs = [
  'سبحان الله و بحمده',
  'سبحان الله العظيم',
  'أستغفر الله',
  'اللهم صل و سلم على محمد',
  'الحمد لله و الله أكبر',
  'لا إله إلا الله'
]

function App(): JSX.Element {
  const [yards, setYards] = useState(0)
  const [feets, setFeets] = useState(0)
  const [inches, setInches] = useState(0)
  const [result, setResult] = useState(null)
  const [currentDikr, setCurrentDikr] = useState('')
  const handleConvert = (e): void => {
    e.preventDefault()
    window.electron.ipcRenderer.send('convert-length-request', { yards, feets, inches })

    const handleResponse = (event, results): void => {
      console.log(event)
      setResult(results)
    }
    window.electron.ipcRenderer.on('convert-length-response', handleResponse)
  }
  const handleReset = (e): void => {
    e.preventDefault()
    setYards(0)
    setFeets(0)
    setInches(0)
    setResult(null)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * dikrs.length)
      setCurrentDikr(dikrs[randomIndex])
    }, 3000)

    return (): void => clearInterval(intervalId)
  }, [dikrs])
  return (
    <div className="mainWrapper">
      <h1 className="title">Converter</h1>
      <form className="convert_form">
        <div className="form_group">
          <input
            type="number"
            name="yards"
            value={yards}
            className="textInput"
            onChange={(e) => setYards(parseInt(e.target.value))}
          />
          <span className="unit">yd</span>
        </div>
        <div className="form_group">
          <input
            type="number"
            name="feets"
            value={feets}
            className="textInput"
            onChange={(e) => setFeets(parseInt(e.target.value))}
          />
          <span className="unit">&apos; &nbsp; ft</span>
        </div>
        <div className="form_group">
          <input
            type="number"
            name="inches"
            value={inches}
            className="textInput"
            onChange={(e) => setInches(parseInt(e.target.value))}
          />
          <span className="unit">&apos;&apos; &nbsp; in</span>
        </div>
        <div className="action_buttons">
          <button onClick={(e) => handleConvert(e)}>Convert</button>
          <button onClick={(e) => handleReset(e)}>Reset</button>
        </div>
      </form>
      <div className="result">
        <h3>{result !== null ? result : 0}</h3>
        <span className="result_unit">M</span>
      </div>

      {currentDikr}
    </div>
  )
}

export default App
