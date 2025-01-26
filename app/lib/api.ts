export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  weight: number
  additives: { name: string; price: number }[]
}

export type CartItem = MenuItem & {
  quantity: number
  selectedAdditives: string[]
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Sizzling Beef Street Taco",
    description: "Authentic Mexican-style street taco filled with tender beef.",
    price: 12.99,
    image: "/tacos.jpg",
    weight: 250,
    additives: [
      { name: "Extra Beef", price: 2.5 },
      { name: "Guacamole", price: 1.5 },
      { name: "Sour Cream", price: 0.75 },
    ],
  },
  {
    id: "2",
    name: "Signature Burger",
    description: "A mouthwatering half-pound Angus beef patty.",
    price: 6.99,
    image: "/signature.jpg",
    weight: 350,
    additives: [
      { name: "Extra Patty", price: 3.5 },
      { name: "Avocado", price: 1.5 },
      { name: "Fried Egg", price: 1.25 },
    ],
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella and basil",
    price: 10.99,
    image: "/marghertia.jpg",
    weight: 400,
    additives: [
      { name: "Extra Cheese", price: 2.0 },
      { name: "Mushrooms", price: 1.5 },
      { name: "Olives", price: 1.0 },
    ],
  },
]

// Simulating a user's cart
let cart: CartItem[] = []

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const item = menuItems.find((item) => item.id === id)
  return item || null
}

export async function getCart(): Promise<CartItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  console.log("Getting cart:", cart)
  return cart
}

export async function addToCart(itemId: string, quantity: number, selectedAdditives: string[]): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const menuItem = await getMenuItem(itemId)
  if (!menuItem) {
    throw new Error("Item not found")
  }

  const existingCartItemIndex = cart.findIndex((item) => item.id === itemId)

  if (existingCartItemIndex > -1) {
    // Update existing item
    cart[existingCartItemIndex].quantity += quantity
    cart[existingCartItemIndex].selectedAdditives = [
      ...new Set([...cart[existingCartItemIndex].selectedAdditives, ...selectedAdditives]),
    ]
  } else {
    // Add new item
    cart.push({
      ...menuItem,
      quantity,
      selectedAdditives,
    })
  }

  console.log("Cart after adding item:", cart)
}

export async function removeFromCart(itemId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  cart = cart.filter((item) => item.id !== itemId)
  console.log("Cart after removing item:", cart)
}

export async function updateCartItemQuantity(itemId: string, quantity: number): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const cartItemIndex = cart.findIndex((item) => item.id === itemId)
  if (cartItemIndex > -1) {
    if (quantity > 0) {
      cart[cartItemIndex].quantity = quantity
    } else {
      cart.splice(cartItemIndex, 1)
    }
  }
  console.log("Cart after updating quantity:", cart)
}

