// src/ThreeScene.js
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ThreeScene = () => {
  const containerRef = useRef(null)

  const neonColors = [
    { r: 255, g: 0, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 0, b: 255 },
    { r: 255, g: 255, b: 0 },
    { r: 0, g: 255, b: 255 },
    { r: 255, g: 0, b: 255 },
  ]

  // Implement cubePositions and createCube
  const cubePositions = []
  for (let i = 0; i < 100; i++) {
    cubePositions.push({
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      z: Math.random() * 10 - 5,
    })
  }

  const createCube = (position, colorIndex) => {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(position.x, position.y, position.z)

    const cubeColor = new THREE.Color().setRGB(
      neonColors[colorIndex].r / 255,
      neonColors[colorIndex].g / 255,
      neonColors[colorIndex].b / 255
    )
    cube.material.color = cubeColor

    return cube
  }

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    const cubes = cubePositions.map((position, index) => createCube(position, index % neonColors.length))
    scene.add(...cubes)

    const animate = () => {
      requestAnimationFrame(animate)

      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
      })

      renderer.render(scene, camera)
    }

    animate()

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    })

    return () => {
      containerRef.current.removeChild(renderer.domElement)
      window.removeEventListener('resize', () => { })
    }
  }, [])

  return <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }} />
}

export default ThreeScene