import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SpinWheel from './SpinWheel'
import './MenuScene.css'
import valentineGuy from '../Valentine Guy.jpg'

const MenuScene = ({ onNavigate }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const menuItemsRef = useRef(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [showSpinWheel, setShowSpinWheel] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState(null)
  const noButtonRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2,
        ease: 'power2.out'
      }
    )
    
    tl.fromTo(menuItemsRef.current.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15
      },
      '-=0.5'
    )
  }, [])

  const handleMenuClick = (menu) => {
    const tl = gsap.timeline()
    
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        if (onNavigate) onNavigate(menu)
      }
    })
  }

  const handleValentineClick = () => {
    setShowConfirmation(true)
  }

  const handleNoHover = () => {
    // Generate random position to escape the cursor
    const randomTop = Math.random() * 70 + 10 // Between 10% and 80%
    const randomLeft = Math.random() * 70 + 10 // Between 10% and 80%
    
    setNoButtonPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    })

    // Animate the button escape
    if (noButtonRef.current) {
      gsap.to(noButtonRef.current, {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      })
    }
  }

  const handleYesClick = () => {
    setShowConfirmation(false)
    setShowThankYou(true)
    
    // After 3 seconds, show spinning wheel
    setTimeout(() => {
      setShowThankYou(false)
      setShowSpinWheel(true)
    }, 3500)
  }

  return (
    <div className="menu-scene" ref={containerRef}>
      <div className="menu-frame">
        <div className="menu-title" ref={titleRef}>
          <h1 className="title-main">Happy Valentine</h1>
          <p className="title-sub">Explore  our memories</p>
        </div>

        <div className="menu-items" ref={menuItemsRef}>
          <button 
            className="menu-item"
            onClick={() => handleMenuClick('letter')}
          >
            <span className="menu-number">01</span>
            <span className="menu-text">Read Letter</span>
            <span className="menu-desc">A message from my heart</span>
          </button>

          <button 
            className="menu-item"
            onClick={() => handleMenuClick('timeline')}
          >
            <span className="menu-number">02</span>
            <span className="menu-text">Our Timeline</span>
            <span className="menu-desc">Every moment we shared</span>
          </button>
        </div>

        <div className="menu-footer">
          <p className="footer-quote">
            "Will you be my <span className="highlight" onClick={handleValentineClick}>Valentine?</span>"
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <h2 className="confirmation-title">Are you Sure?</h2>
            <div className="confirmation-buttons-container">
              <button 
                className="yes-button"
                onClick={handleYesClick}
              >
                Yes! 💖
              </button>
              <button 
                ref={noButtonRef}
                className={noButtonPosition ? "no-button-moving" : "no-button"}
                onMouseEnter={handleNoHover}
                style={noButtonPosition ? {
                  position: 'fixed',
                  top: noButtonPosition.top,
                  left: noButtonPosition.left,
                  transition: 'all 0.3s ease',
                  zIndex: 9999
                } : {}}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="thankyou-overlay">
          <div className="thankyou-modal">
            <img 
              src={valentineGuy} 
              alt="Valentine Guy" 
              className="valentine-guy-image"
            />
            <h2 className="thankyou-title">Thank You Langga! 💕</h2>
            <p className="thankyou-message">
              You have <span className="chances-highlight">2 spinning wheel chances</span> to win amazing prizes!
            </p>
          </div>
        </div>
      )}

      {showSpinWheel && <SpinWheel onClose={() => setShowSpinWheel(false)} />}
    </div>
  )
}

export default MenuScene
