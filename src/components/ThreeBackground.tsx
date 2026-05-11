'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/context/ThemeContext'

/**
 * Dark-mode parallax starfield. Three layered point clouds drift slowly,
 * camera follows the pointer for depth, additive blending gives the glow.
 */
export default function ThreeBackground() {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (theme !== 'dark') return
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050814, 0.0009)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      3000,
    )
    camera.position.z = 600

    // antialias=false + capped DPR cuts fragment shader load roughly in half
    // on retina displays. Points with additive blending already look soft.
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x050814, 1)
    container.appendChild(renderer.domElement)

    type Layer = { points: THREE.Points; rotateSpeed: number }
    const layers: Layer[] = []

    const makeLayer = (
      count: number,
      spread: number,
      size: number,
      color: number,
      opacity: number,
      rotateSpeed: number,
    ) => {
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const material = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const points = new THREE.Points(geometry, material)
      scene.add(points)
      layers.push({ points, rotateSpeed })
    }

    // Particle counts trimmed ~33% for smoother GPU paint with no visible loss.
    // Deep distant stars — cool indigo tint, tiny
    makeLayer(1200, 2400, 1.4, 0x4f6bff, 0.55, 0.00008)
    // Mid layer — soft lavender
    makeLayer(500,  1400, 2.0, 0xa5b4fc, 0.75, 0.00018)
    // Close bright accents — near-white
    makeLayer(120,   900, 3.2, 0xffffff, 0.95, 0.00032)

    const pointer = { tx: 0, ty: 0, x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth  - 0.5) * 2
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let rafId = 0
    let running = !document.hidden
    const animate = () => {
      if (!running) {
        // tab hidden — schedule next check but skip render
        rafId = requestAnimationFrame(animate)
        return
      }

      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04

      if (!reduceMotion) {
        for (const { points, rotateSpeed } of layers) {
          points.rotation.y += rotateSpeed
          points.rotation.x += rotateSpeed * 0.4
        }
      }

      camera.position.x += ( pointer.x * 45 - camera.position.x) * 0.04
      camera.position.y += (-pointer.y * 45 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    // Pause render loop when tab is backgrounded — saves significant CPU/GPU.
    const onVisibility = () => { running = !document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      for (const { points } of layers) {
        points.geometry.dispose()
        ;(points.material as THREE.Material).dispose()
      }
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  if (theme !== 'dark') return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
