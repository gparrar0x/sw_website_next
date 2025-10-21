'use client'

import { useEffect } from 'react'

export default function HeroAnimations() {
  useEffect(() => {
    // Typing animation for hero title
    const setupTypingAnimation = () => {
      const highlight = document.querySelector('.sw-hero-title .sw-highlight') as HTMLElement
      if (highlight) {
        const text = highlight.textContent || ''
        highlight.textContent = ''
        highlight.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)'

        let i = 0
        const typeWriter = () => {
          if (i < text.length) {
            highlight.textContent += text.charAt(i)
            i++
            setTimeout(typeWriter, 30)
          } else {
            // Remove cursor after typing
            setTimeout(() => {
              highlight.style.borderRight = 'none'
            }, 1000)
          }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000)
      }
    }

    // Parallax effects for orbs
    const setupParallaxEffects = () => {
      const orbs = document.querySelectorAll('.sw-gradient-orb') as NodeListOf<HTMLElement>

      const handleScroll = () => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5

        orbs.forEach((orb, index) => {
          const speed = 0.5 + (index * 0.2)
          orb.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.05}deg)`
        })
      }

      // Throttle scroll events for performance (60fps)
      let ticking = false
      const throttledScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', throttledScroll, { passive: true })

      // Cleanup
      return () => {
        window.removeEventListener('scroll', throttledScroll)
      }
    }

    // Intersection Observer for scroll animations
    const setupIntersectionObserver = () => {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sw-animate-in')

            // Animate child elements with stagger effect for service cards
            const children = entry.target.querySelectorAll('.sw-service-features li')
            children.forEach((child, index) => {
              const htmlChild = child as HTMLElement
              setTimeout(() => {
                htmlChild.style.opacity = '1'
                htmlChild.style.transform = 'translateY(0)'
              }, index * 100)
            })
          }
        })
      }, observerOptions)

      // Observe service cards and other elements
      const animateElements = document.querySelectorAll('.sw-service-card, .sw-founder-card')
      animateElements.forEach(el => {
        el.classList.add('sw-animate-element')
        observer.observe(el)
      })

      // Cleanup
      return () => {
        observer.disconnect()
      }
    }

    // Initialize animations
    setupTypingAnimation()
    const cleanupParallax = setupParallaxEffects()
    const cleanupObserver = setupIntersectionObserver()

    // Cleanup function
    return () => {
      if (cleanupParallax) cleanupParallax()
      if (cleanupObserver) cleanupObserver()
    }
  }, [])

  return null
}
