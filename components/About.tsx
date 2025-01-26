import Image from "next/image"
import Link from "next/link"
import React from "react"

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div className="flex flex-col text-left gap-6 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold  text-orange-600">Cravings? We've Got You!</h1>
          <h4 className="font-medium text-orange-400 leading-relaxed">
            From the first bite to the last crumb, we're here to serve up flavors that hit the spot every time. Whether
            you're in the mood for our juicy, melt-in-your-mouth burgers, crispy, saucy wings, or perfectly seasoned
            sides, we've got something to satisfy every craving. At our place, it's not just food—it's an experience
            made with passion, served fresh, and guaranteed to make your taste buds smile. Come hungry, leave
            happy—we're all about making every meal unforgettable!
          </h4>
          <Link href="/menu" className="inline-block">
            <button className="px-6 py-3 border border-orange-300 bg-orange-500 hover:bg-orange-400 transition-all duration-300 text-white hover:text-white font-bold">
              Show Menu
            </button>
          </Link>
        </div>

        <div className="flex-shrink-0">
          <Image src="/pizza.png" alt="BurgerWing" width={400} height={400} className="object-contain" />
        </div>
      </div>
    </div>
  )
}

export default About

