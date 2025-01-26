"use client"
import React, { useState, useEffect } from "react"

const Hero = () => {
  const images = [
    "https://images.unsplash.com/photo-1550547660-d9450f859349",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://c.files.bbci.co.uk/800f/live/7479d750-71eb-11ef-b02d-c5f3b724a1ea.jpg",
  ]

  const [currentImage, setCurrentImage] = useState(0)
  const [nextImage, setNextImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
      setNextImage((prevImage) => (prevImage + 1) % images.length)
    }, 3000) // Change image every 6 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex flex-col justify-center items-start h-screen overflow-hidden">
      {/* Current Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          opacity: 1,
        }}
      />

      {/* Next Image (for fade effect) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[nextImage]})`,
          opacity: 0,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-8 md:px-16">
        <h1 className="text-4xl uppercase md:text-6xl font-extrabold text-white mb-4 text-left">
          <span className="text-orange-400">Burger</span>Wing
        </h1>
        <h3 className="text-lg md:text-2xl text-white max-w-xl mb-8 text-left">
          Where every dish tells a story. Indulge in flavors crafted with passion, served with elegance.
        </h3>
        <button className="uppercase text-sm md:text-base border border-white bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-500 transition">
          Make an order
        </button>
      </div>
    </div>
  )
}

export default Hero

