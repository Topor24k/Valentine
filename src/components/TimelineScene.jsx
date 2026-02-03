import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './TimelineScene.css'

const TimelineScene = ({ onNavigate }) => {
  const [timelineItems, setTimelineItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    mainPhoto: '',
    bundlePhotos: [],
    message: ''
  })
  const [mainPhotoPreview, setMainPhotoPreview] = useState(null)
  const [bundlePhotoPreviews, setBundlePhotoPreviews] = useState([])
  const containerRef = useRef(null)
  const timelineRef = useRef(null)
  const formRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    fetchTimelineItems()
    
    const tl = gsap.timeline()
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
  }, [])

  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, scale: 0.95, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' }
      )
    }
  }, [showForm])

  useEffect(() => {
    if (timelineItems.length > 0 && timelineRef.current) {
      gsap.fromTo(timelineRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.2,
          ease: 'power2.out'
        }
      )
    }
  }, [timelineItems])

  const fetchTimelineItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/timeline')
      const data = await response.json()
      setTimelineItems(data)
    } catch (error) {
      console.error('Error fetching timeline:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMainPhotoPreview(reader.result)
        setFormData(prev => ({
          ...prev,
          mainPhoto: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBundlePhotosChange = (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = []
    const newPhotos = []
    let filesProcessed = 0

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result)
        newPhotos.push(reader.result)
        filesProcessed++
        
        if (filesProcessed === files.length) {
          setBundlePhotoPreviews(prev => [...prev, ...newPreviews])
          setFormData(prev => ({
            ...prev,
            bundlePhotos: [...prev.bundlePhotos, ...newPhotos]
          }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeBundlePhoto = (index) => {
    setBundlePhotoPreviews(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      bundlePhotos: prev.bundlePhotos.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/timeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setFormData({
          title: '',
          date: '',
          mainPhoto: '',
          bundlePhotos: [],
          message: ''
        })
        setMainPhotoPreview(null)
        setBundlePhotoPreviews([])
        setShowForm(false)
        fetchTimelineItems()
      }
    } catch (error) {
      console.error('Error adding timeline item:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      try {
        await fetch(`http://localhost:3001/api/timeline/${id}`, {
          method: 'DELETE'
        })
        fetchTimelineItems()
      } catch (error) {
        console.error('Error deleting timeline item:', error)
      }
    }
  }

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <div className="timeline-scene" ref={containerRef}>
      <button className="back-btn" onClick={() => onNavigate('menu')}>
        ← Back to Menu
      </button>

      <div className="timeline-container">
        <div className="timeline-header" ref={titleRef}>
          <h1 className="timeline-title">WELCOME TO OUR TIMELINE!</h1>
          <p className="timeline-subtitle">Our Journey Together</p>
          <button 
            className="add-memory-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Memory
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" ref={formRef} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                ✕
              </button>
              <form className="timeline-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Add a New Memory</h2>
                <p>Capture our special moments forever</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Title <span className="required">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="First Date, Anniversary, etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date <span className="required">*</span></label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group photo-upload">
                <label>Main Photo <span className="required">*</span></label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainPhotoChange}
                    id="main-photo-upload"
                    required
                  />
                  <label htmlFor="main-photo-upload" className="upload-label">
                    {mainPhotoPreview ? '📷 Change Main Photo' : '📷 Choose Main Photo'}
                  </label>
                </div>
                {mainPhotoPreview && (
                  <div className="image-preview">
                    <img src={mainPhotoPreview} alt="Main Preview" />
                  </div>
                )}
              </div>

              <div className="form-group photo-upload">
                <label>Bundle Photos (Optional)</label>
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBundlePhotosChange}
                    id="bundle-photos-upload"
                    multiple
                  />
                  <label htmlFor="bundle-photos-upload" className="upload-label">
                    📷 Add More Photos
                  </label>
                </div>
                {bundlePhotoPreviews.length > 0 && (
                  <div className="bundle-photos-preview">
                    {bundlePhotoPreviews.map((preview, index) => (
                      <div key={index} className="bundle-photo-item">
                        <img src={preview} alt={`Bundle ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-photo-btn"
                          onClick={() => removeBundlePhoto(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Short Message <span className="required">*</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write a short message about this memory..."
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Add to Our Timeline
              </button>
            </form>
            </div>
          </div>
        )}

        <div className="timeline-content-wrapper">
          <div className="timeline-line-container" ref={timelineRef}>
            {timelineItems.length === 0 ? (
              <div className="empty-timeline">
                <div className="empty-frame">
                  <p>No memories yet.</p>
                  <p className="empty-sub">Click "Add Memory" to start your timeline!</p>
                </div>
              </div>
            ) : (
              <>
                <div className="timeline-line"></div>
                {timelineItems.map((item, index) => {
                  const isExpanded = expandedItem === item._id
                  const position = index % 2 === 0 ? 'top' : 'bottom'
                  return (
                    <div 
                      key={item._id} 
                      className={`timeline-item ${position} ${isExpanded ? 'expanded' : ''}`}
                      onClick={() => !isExpanded && toggleExpand(item._id)}
                    >
                      <div className="timeline-content">
                        <div className="timeline-image">
                          <img src={item.mainPhoto} alt={item.title} />
                        </div>
                        <h3 className="timeline-title-text">{item.title}</h3>
                        
                        {isExpanded && (
                          <div className="timeline-details">
                            <p className="timeline-date">
                              {new Date(item.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            {item.bundlePhotos && item.bundlePhotos.length > 0 && (
                              <div className="timeline-bundle-photos">
                                {item.bundlePhotos.map((photo, idx) => (
                                  <img key={idx} src={photo} alt={`Photo ${idx + 1}`} />
                                ))}
                              </div>
                            )}
                            <p className="timeline-description">{item.message}</p>
                            <div className="timeline-actions">
                              <button 
                                className="delete-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(item._id)
                                }}
                              >
                                Remove Memory
                              </button>
                              <button 
                                className="close-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleExpand(item._id)
                                }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>

        <div className="timeline-navigation">
          <button className="nav-arrow left-arrow">←</button>
          <button className="nav-arrow right-arrow">→</button>
        </div>
      </div>
    </div>
  )
}

export default TimelineScene
