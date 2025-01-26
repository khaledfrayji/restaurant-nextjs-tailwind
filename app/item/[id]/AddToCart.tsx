"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { type MenuItem, addToCart } from "@/app/lib/api"

type NutritionalInfo = {
  fat: number
  carbohydrate: number
  protein: number
}

type Beverage = {
  name: string
  price: number
}

// Extend the MenuItem type to include nutritional info
type MenuItemExtended = MenuItem & {
  nutritionalInfo: NutritionalInfo
}

// Mock data for beverages (in a real app, this would come from the API)
const beverages: Beverage[] = [
  { name: "Cola", price: 2.5 },
  { name: "Lemonade", price: 2.75 },
  { name: "Iced Tea", price: 2.25 },
]

export default function AddToCartForm({ item }: { item: MenuItemExtended }) {
  const [selectedAdditives, setSelectedAdditives] = useState<string[]>([])
  const [selectedBeverage, setSelectedBeverage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const handleAdditiveChange = (additiveName: string) => {
    setSelectedAdditives((prev) =>
      prev.includes(additiveName) ? prev.filter((name) => name !== additiveName) : [...prev, additiveName],
    )
  }

  const calculateTotalPrice = () => {
    const basePrice = item.price * quantity
    const additivesPrice = selectedAdditives.reduce((total, additiveName) => {
      const additive = item.additives.find((a) => a.name === additiveName)
      return total + (additive?.price || 0)
    }, 0)
    const beveragePrice = selectedBeverage ? beverages.find((b) => b.name === selectedBeverage)?.price || 0 : 0
    return basePrice + additivesPrice + beveragePrice
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addToCart(item.id, quantity, selectedAdditives)
      router.push("/cart")
    } catch (error) {
      console.error("Error adding item to cart:", error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  lg:flex-row gap-8">
      <div className="lg:w-1/2">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={400}
          height={300}
          className="w-full h-auto rounded-lg shadow-md mb-4"
        />
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
          <ul className="space-y-2">
            <li>Weight: {item.weight}g</li>
            <li>Fat: {item.nutritionalInfo.fat}g</li>
            <li>Carbohydrate: {item.nutritionalInfo.carbohydrate}g</li>
            <li>Protein: {item.nutritionalInfo.protein}g</li>
          </ul>
        </div>
      </div>

      <div className="lg:w-1/2">
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Additives</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Option</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {item.additives.map((additive) => (
                <tr key={additive.name}>
                  <td className="border border-gray-300 p-2">{additive.name}</td>
                  <td className="border border-gray-300 p-2">${additive.price.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={selectedAdditives.includes(additive.name)}
                      onChange={() => handleAdditiveChange(additive.name)}
                      className="form-checkbox h-5 w-5 text-orange-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Beverages</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Option</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {beverages.map((beverage) => (
                <tr key={beverage.name}>
                  <td className="border border-gray-300 p-2">{beverage.name}</td>
                  <td className="border border-gray-300 p-2">${beverage.price.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="radio"
                      name="beverage"
                      value={beverage.name}
                      checked={selectedBeverage === beverage.name}
                      onChange={() => setSelectedBeverage(beverage.name)}
                      className="form-radio h-5 w-5 text-orange-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value)))}
              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>
          <div className="text-2xl font-bold">Total: ${calculateTotalPrice().toFixed(2)}</div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </form>
  )
}

