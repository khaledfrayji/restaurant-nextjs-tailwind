import type React from "react"

interface MenuItem {
  title: string
  description: string
  price: number
}

interface MenuSection {
  name: string
  items: MenuItem[]
}

const menu: MenuSection[] = [
  {
    name: "Starters",
    items: [
      {
        title: "Truffle Infused Foie Gras",
        description: "Seared foie gras with black truffle shavings, served with brioche toast",
        price: 24,
      },
      {
        title: "Lobster Bisque",
        description: "Creamy lobster soup with cognac and crème fraîche",
        price: 18,
      },
      {
        title: "Wagyu Beef Carpaccio",
        description: "Thinly sliced Wagyu beef with arugula, Parmesan, and truffle oil",
        price: 22,
      },
    ],
  },
  {
    name: "Main Courses",
    items: [
      {
        title: "Filet Mignon Wellington",
        description: "Prime beef tenderloin wrapped in puff pastry with mushroom duxelles",
        price: 48,
      },
      {
        title: "Pan-Seared Chilean Sea Bass",
        description: "Served with saffron risotto and lemon beurre blanc",
        price: 42,
      },
      {
        title: "Truffle Risotto",
        description: "Arborio rice with black truffle, Parmigiano-Reggiano, and mascarpone",
        price: 36,
      },
    ],
  },
  {
    name: "Signature Burgers",
    items: [
      {
        title: "The Royal BurgerWing",
        description: "Wagyu beef patty, foie gras, truffle aioli, and gold leaf on a brioche bun",
        price: 45,
      },
      {
        title: "Lobster Thermidor Burger",
        description: "Black Angus beef topped with lobster thermidor and Gruyère cheese",
        price: 38,
      },
      {
        title: "Truffle Mushroom Burger",
        description: "Portobello mushroom, truffle paste, and aged Gouda on a pretzel bun",
        price: 32,
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        title: "Valrhona Chocolate Soufflé",
        description: "Served with Grand Marnier crème anglaise",
        price: 16,
      },
      {
        title: "Crème Brûlée Trio",
        description: "Classic vanilla, lavender, and matcha flavors",
        price: 14,
      },
      {
        title: "Artisanal Cheese Plate",
        description: "Selection of fine cheeses with honey, nuts, and fruit compote",
        price: 20,
      },
    ],
  },
]
const ElegantMenu: React.FC = () => {
    return (
      <div
        className="min-h-screen py-16 px-4 bg-black sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1550547660-d9450f859349')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-90" /> {/* Overlay */}
        <div className="relative max-w-3xl mx-auto z-10">
          <h1 className="text-4xl text-center font-bold mb-12 text-white"><span className=" text-orange-500">Burger</span>Wing</h1>
          {menu.map((section, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-serif mb-6 uppercase text-orange-200 border-b border-gray-300 pb-2">{section.name}</h2>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-medium text-gray-300">{item.title}</h3>
                    <span className="text-lg text-gray-400">${item.price}</span>
                  </div>
                  <p className="text-gray-500 italic">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
          <footer className="text-center text-gray-500 mt-16">
            <p>Please inform your server of any allergies or dietary restrictions.</p>
            <p className="mt-2">A discretionary 18% service charge will be added to parties of 6 or more.</p>
          </footer>
        </div>
      </div>
    )
  }
  
  export default ElegantMenu
  