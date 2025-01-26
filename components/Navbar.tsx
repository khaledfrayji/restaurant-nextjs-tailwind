"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FaUtensils, FaTruck, FaInfoCircle, FaEnvelope, FaShoppingCart } from "react-icons/fa"

const navItems = [
  { name: "Menu", href: "/menu", icon: FaUtensils },
  { name: "About", href: "/about", icon: FaInfoCircle },
  { name: "Contact", href: "#contact", icon: FaEnvelope },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // This would typically come from your cart state management
  const cartItemsCount = 3

  return (
    <nav className="bg-black shadow-xl  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
             
              <span className="ml-2 text-xl font-bold text-white font-logo">BurgerWing</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
                  ${
                    pathname === item.href
                      ? "bg-orange-500 text-white uppercase"
                      : "text-white hover:bg-orange-100 uppercase hover:text-orange-500"
                  }`}
              >
                <item.icon className="mr-2" />
                {item.name}
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative p-2 text-white hover:bg-orange-100 hover:text-orange-500 rounded-md transition-colors duration-200 ease-in-out"
            >
              <FaShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:bg-orange-100 hover:text-orange-500 rounded-md transition-colors duration-200 ease-in-out"
            >
              <FaShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 text-gray-600 hover:bg-orange-100 hover:text-orange-500 rounded-md transition-colors duration-200 ease-in-out"
            >
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

