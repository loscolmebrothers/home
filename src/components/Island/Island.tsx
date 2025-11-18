import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const Island = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const islandRef = useRef<HTMLDivElement>(null)
  const brosRef = useRef<HTMLImageElement>(null)
  const balloonLogoRef = useRef<HTMLDivElement>(null)
  const losRef = useRef<HTMLImageElement>(null)
  const colmeRef = useRef<HTMLImageElement>(null)
  const brothersRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (
      !containerRef.current ||
      !islandRef.current ||
      !brosRef.current ||
      !balloonLogoRef.current ||
      !losRef.current ||
      !colmeRef.current ||
      !brothersRef.current
    ) {
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      gsap.set([islandRef.current, brosRef.current, balloonLogoRef.current], {
        opacity: 0,
      })

      tl.from(islandRef.current, {
        y: 100,
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.2)',
      })
        .from(
          brosRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .from(
          balloonLogoRef.current,
          {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.6)',
          },
          '-=0.4'
        )
        .from(
          [losRef.current, colmeRef.current, brothersRef.current],
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(2)',
          },
          '-=0.5'
        )

      gsap.to(islandRef.current, {
        y: '+=15',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      gsap.to(balloonLogoRef.current, {
        y: '+=25',
        rotation: '+=3',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(balloonLogoRef.current, {
        rotation: '-=2',
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3,
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-square max-w-4xl mx-auto">
          <div
            ref={islandRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src="/assets/illustrations/Island.svg"
              alt="Floating Island"
              className="w-full h-full object-contain"
            />
          </div>

          <div
            ref={brosRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img
              src="/assets/illustrations/Bros.svg"
              alt="Colme Brothers"
              className="w-[85%] h-[85%] object-contain"
              style={{
                transform: 'translateY(5%)',
              }}
            />
          </div>

          <div
            ref={balloonLogoRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] flex flex-col items-center gap-1 sm:gap-2"
            style={{
              transformOrigin: 'center bottom',
            }}
          >
            <img
              ref={losRef}
              src="/assets/logo/LOS.svg"
              alt="LOS"
              className="w-full h-auto"
            />
            <img
              ref={colmeRef}
              src="/assets/logo/COLME.svg"
              alt="COLME"
              className="w-full h-auto"
            />
            <img
              ref={brothersRef}
              src="/assets/logo/BROTHERS.svg"
              alt="BROTHERS"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
