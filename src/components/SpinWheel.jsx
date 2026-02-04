import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './SpinWheel.css'

const SpinWheel = ({ onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [spinsLeft, setSpinsLeft] = useState(2)
  const wheelRef = useRef(null)
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  const prizes = [
    { id: 1, text: "Stuffed Toy Surprise", icon: "gift", color: "#d81b60" },
    { id: 2, text: "Better Luck Next Time", subtitle: "Still lucky to have me", icon: "heart", color: "#f8bbd0" },
    { id: 3, text: "Treat you to Food", icon: "restaurant", color: "#c2185b" },
    { id: 4, text: "Dream Places to Go", subtitle: "(Davao)", icon: "flight", color: "#ad1457" },
    { id: 5, text: "Better Luck Next Time", subtitle: "Spin again with a kiss", icon: "heart", color: "#f8bbd0" },
    { id: 6, text: "You Decide", subtitle: "Anything reasonable for the day", icon: "star", color: "#880e4f" },
    { id: 7, text: "Love Coupon", subtitle: "Free massage", icon: "spa", color: "#c2185b" },
    { id: 8, text: "Better Luck Next Time", subtitle: "No prize, just love", icon: "heart", color: "#f8bbd0" },
    { id: 9, text: "Treat you to Food", icon: "restaurant", color: "#c2185b" },
    { id: 10, text: "Kiss Pass", icon: "favorite", color: "#8b1e1e" },
    { id: 11, text: "Dream Places to Go", subtitle: "(Davao)", icon: "flight", color: "#ad1457" },
    { id: 12, text: "You Decide", subtitle: "Anything reasonable for the day", icon: "star", color: "#880e4f" },
    { id: 13, text: "Love Coupon", subtitle: "Movie night / Late-night talk", icon: "theater", color: "#c2185b" },
    { id: 14, text: "Something Intimate", icon: "lock", color: "#8b1e1e" },
    { id: 15, text: "Better Luck Next Time", subtitle: "I owe you a smile", icon: "heart", color: "#f8bbd0" },
    { id: 16, text: "Pop Mart Surprise Box", icon: "box", color: "#e91e63" },
    { id: 17, text: "Flower", icon: "flower", color: "#ff4081" }
  ]

  useEffect(() => {
    // Load spins from localStorage
    const savedSpins = localStorage.getItem('valentineSpinsLeft')
    if (savedSpins !== null) {
      setSpinsLeft(parseInt(savedSpins))
    }

    // Entrance animation
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    tl.fromTo(modalRef.current,
      { scale: 0.8, opacity: 0, y: -50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
      '-=0.1'
    )
  }, [])

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return

    setIsSpinning(true)
    setResult(null)

    const randomIndex = Math.floor(Math.random() * prizes.length)
    const degreesPerSlice = 360 / prizes.length
    const extraSpins = 5 // Number of full rotations
    const finalRotation = (extraSpins * 360) + (randomIndex * degreesPerSlice) + (degreesPerSlice / 2)

    gsap.to(wheelRef.current, {
      rotation: finalRotation,
      duration: 4,
      ease: 'power4.out',
      onComplete: () => {
        setIsSpinning(false)
        setResult(prizes[randomIndex])
        
        const newSpinsLeft = spinsLeft - 1
        setSpinsLeft(newSpinsLeft)
        localStorage.setItem('valentineSpinsLeft', newSpinsLeft.toString())
      }
    })
  }

  const handleClose = () => {
    const tl = gsap.timeline()
    tl.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: -50,
      duration: 0.3,
      ease: 'back.in(1.5)'
    })
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose
    }, '-=0.1')
  }

  return (
    <div className="spinwheel-overlay" ref={overlayRef}>
      <div className="spinwheel-modal" ref={modalRef}>
        <button className="spinwheel-close" onClick={handleClose}>×</button>
        
        <div className="spinwheel-header">
          <h2>Spin the Wheel for a Prize</h2>
          <p className="spins-remaining">Spins Remaining: <span>{spinsLeft}</span></p>
          {spinsLeft > 0 && (
            <p className="screenshot-reminder">Remember to screenshot your prize</p>
          )}
        </div>

        <div className="wheel-container">
          <div className="wheel-pointer"></div>
          <div className="wheel" ref={wheelRef}>
            {prizes.map((prize, index) => {
              const rotation = (360 / prizes.length) * index
              return (
                <div
                  key={prize.id}
                  className="wheel-slice"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    backgroundColor: prize.color
                  }}
                >
                  <div className="slice-content">
                    <span className="slice-number">{prize.id}</span>
                  </div>
                </div>
              )
            })}
            <div className="wheel-center">
              <span>SPIN</span>
            </div>
          </div>
        </div>

        {spinsLeft > 0 ? (
          <button 
            className="spin-button" 
            onClick={spinWheel}
            disabled={isSpinning}
          >
            {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
          </button>
        ) : (
          <div className="no-spins-message">
            <p>All spins used</p>
            <p className="sub-message">Hope you got something amazing</p>
          </div>
        )}

        {result && (
          <div className="result-display">
            <div className="result-icon-wrapper">
              <div className="result-icon">{result.id}</div>
            </div>
            <h3 className="result-title">{result.text}</h3>
            {result.subtitle && <p className="result-subtitle">{result.subtitle}</p>}
            <p className="result-reminder">Don't forget to screenshot this</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpinWheel
