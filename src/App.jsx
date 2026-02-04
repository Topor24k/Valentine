import React, { useState } from 'react'
import MenuScene from './components/MenuScene'
import TimelineScene from './components/TimelineScene'
import LetterScene from './components/LetterScene'
import './App.css'

function App() {
  const [currentScene, setCurrentScene] = useState('menu')

  const handleNavigate = (scene) => {
    setCurrentScene(scene)
  }

  return (
    <div className="app">
      {currentScene === 'menu' && <MenuScene onNavigate={handleNavigate} />}
      {currentScene === 'letter' && <LetterScene onNavigate={handleNavigate} />}
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
