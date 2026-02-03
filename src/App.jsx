import React, { useState } from 'react'
import MenuScene from './components/MenuScene'
import TimelineScene from './components/TimelineScene'
import './App.css'

function App() {
  const [currentScene, setCurrentScene] = useState('menu')

  const handleNavigate = (scene) => {
    setCurrentScene(scene)
  }

  return (
    <div className="app">
      {currentScene === 'menu' && <MenuScene onNavigate={handleNavigate} />}
      {currentScene === 'letter' && (
        <div className="placeholder">
          <button className="back-btn" onClick={() => setCurrentScene('menu')}>← Back to Menu</button>
          <div>Letter Scene - Coming Soon</div>
        </div>
      )}
      {currentScene === 'timeline' && <TimelineScene onNavigate={handleNavigate} />}
      {currentScene === 'albums' && (
        <div className="placeholder">
          <button className="back-btn" onClick={() => setCurrentScene('menu')}>← Back to Menu</button>
          <div>Albums Scene - Coming Soon</div>
        </div>
      )}
    </div>
  )
}

export default App
