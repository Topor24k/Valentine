import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './MenuScene.css'

const MenuScene = ({ onNavigate }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const menuItemsRef = useRef(null)

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

  return (
    <div className="menu-scene" ref={containerRef}>
      <div className="menu-frame">
        <div className="menu-title" ref={titleRef}>
          <h1 className="title-main">Our Love Story</h1>
          <p className="title-sub">Choose your path through our memories</p>
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

          <button 
            className="menu-item"
            onClick={() => handleMenuClick('albums')}
          >
            <span className="menu-number">03</span>
            <span className="menu-text">Albums</span>
            <span className="menu-desc">Our memories in photos & music</span>
          </button>
        </div>

        <div className="menu-footer">
          <p className="footer-quote">
            "Will you be my <span className="highlight">Valentine?</span>"
          </p>
        </div>
      </div>
    </div>
  )
}

export default MenuScene
