import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Charts } from './components/blocks/health.js'

function App() {
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* Openfitness.local */}
      <h1>Openfitness.l 0.3.0</h1>
      <Button>
        Get Started
      </Button>
      <Charts />
    </>
  )
}

export default App
