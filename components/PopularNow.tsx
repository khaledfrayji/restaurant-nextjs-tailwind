import Image from "next/image"
import Link from "next/link"
import { getMenuItem, type MenuItem } from "@/app/lib/api"

async function getPopularItems(): Promise<MenuItem[]> {
  // In a real application, you might have a separate API call for popular items
  // For now, we'll just fetch the first 3 items
  const items = await Promise.all([getMenuItem("1"), getMenuItem("2"), getMenuItem("3")])
  return items.filter((item): item is MenuItem => item !== null)
}

export default async function PopularNow() {
  const popularItems = await getPopularItems()

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-left text-orange-600 mb-8 uppercase">Popular Now!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  <Link href={`/item/${item.id}`}>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

