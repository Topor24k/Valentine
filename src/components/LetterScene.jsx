import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './LetterScene.css'

const LetterScene = ({ onNavigate }) => {
  const containerRef = useRef(null)
  const letterRef = useRef(null)
  const envelopeRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Fade in container
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    )
    
    // Envelope animation
    tl.fromTo(envelopeRef.current,
      { scale: 1.5, opacity: 0, rotateY: 180 },
      { 
        scale: 1, 
        opacity: 1, 
        rotateY: 0,
        duration: 1.2,
        ease: 'power2.out'
      }
    )
    
    // Letter slides up
    tl.fromTo(letterRef.current,
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5,
        ease: 'power2.out'
      },
      '-=0.5'
    )
  }, [])

  const handleBack = () => {
    const tl = gsap.timeline()
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        if (onNavigate) onNavigate('menu')
      }
    })
  }

  return (
    <div className="letter-scene" ref={containerRef}>
      <button className="letter-back-btn" onClick={handleBack}>
        ← Back to Menu
      </button>
      
      <div className="letter-container">
        <div className="envelope-decoration" ref={envelopeRef}>
          <svg className="envelope-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="letter-paper" ref={letterRef}>
          <div className="letter-header">
            <h1 className="letter-title">To My Dearest Langga</h1>
            <div className="letter-date">Valentine's Day 2026</div>
          </div>

          <div className="letter-content">
            <p className="letter-greeting">Hi langga, happy Valentine's Day</p>

            <p>
              I just want you to know that I really put a lot of effort into this, because it's one 
              of the ways I can show you how much I love you. Sometimes I don't always know how to 
              say everything with words, so I wanted to make something that shows how important you 
              are to me and how thankful I am to have you in my life. When I look back at everything 
              we've been through together, I honestly feel so grateful. Thank you for being such a 
              wonderful, beautiful, and understanding partner. You've been my comfort, my support, 
              and my safe place, and I truly appreciate you so much.
            </p>

            <p>
              We've had our ups and downs, and there were times when things weren't easy, but that's 
              part of any relationship. What matters to me is that we always try to be honest with 
              each other, talk about our problems, and listen even when it's hard. As long as we 
              keep doing that, I believe we'll be okay. No matter what happens, I want you to know 
              that I'm always choosing you.
            </p>

            <p>
              We've both been busy, as always, and maybe we don't always have as much time for each 
              other as we want. Sometimes everything feels rushed and overwhelming, but that doesn't 
              change how I feel about you. We're still in college, still working hard for our dreams 
              and our future, and I know this is just a phase. Someday, we'll have more time for 
              each other — time we won't have to rush, time we can really enjoy together.
            </p>

            <p>
              For now, what matters most to me is that even in the middle of everything, we don't 
              forget each other. That we keep choosing love, patience, and understanding. I'm willing 
              to wait, grow, and go through everything with you, because you're worth it — always.
            </p>

            <p className="letter-closing">
              So anyway, I hope you enjoyed exploring the website I made for you — our timeline. 
              Every memory there means so much to me and reminds me why I love you. This is 
              all for you, langga, and for the love we're still building together. I'm so thankful 
              for you, today and always.
            </p>

            <div className="letter-signature">
              <div className="signature-line">With all my love,</div>
              <div className="signature-name">Kayeen M. Campaña</div>
              <div className="signature-underline"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LetterScene
