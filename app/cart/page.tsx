"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getCart,
  type CartItem,
  removeFromCart,
  updateCartItemQuantity,
} from "@/app/lib/api";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const cart = await getCart();
        setCartItems(cart);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const handleRemoveItem = async (id: string) => {
    try {
      await removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to remove item from cart.");
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      await updateCartItemQuantity(id, quantity);
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (err) {
      setError("Failed to update quantity.");
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const additivesCost = item.selectedAdditives.reduce(
        (sum, additiveName) => {
          const additive = item.additives.find((a) => a.name === additiveName);
          return sum + (additive?.price || 0);
        },
        0
      );
      return total + (item.price + additivesCost) * item.quantity;
    }, 0);
  };

  if (loading) return <p className="text-center p-4">Loading cart...</p>;
  if (error) return <p className="text-center p-4 text-orange-500">{error}</p>;

  return (
    <div className="min-h-screen bg-[#f2f2f2]  text-white">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center uppercase text-orange-700">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-orange-700 uppercase">
            Your cart is empty.{" "}
            <Link href="/menu" className="text-orange-300 underline">
              Continue shopping
            </Link>
            .
          </p>
        ) : (
          <>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-orange-600 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-grow text-center sm:text-left">
                      <h2 className="font-semibold text-lg mb-1">
                        {item.name}
                      </h2>
                      <p className="text-gray-300 text-sm mb-2">
                        Additives: {item.selectedAdditives.join(", ") || "None"}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                        <p className="text-sm">
                          Price: ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor={`quantity-${item.id}`}
                            className="sr-only"
                          >
                            Quantity
                          </label>
                          <input
                            id={`quantity-${item.id}`}
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                            className="w-16 p-1 bg-orange-800 text-white rounded-md text-center"
                          />
                          <p className="text-sm">
                            Total: ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="font-semibold p-2 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              <p className="text-xl sm:text-2xl text-orange-700 font-bold">
                Total: ${calculateTotalPrice().toFixed(2)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="px-6 py-2 bg-orange-200 text-orange-700 rounded-lg shadow hover:bg-orange-300 text-center"
                >
                  Continue Shopping
                </Link>
                <Link href={"/checkout"}>
                  <button className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-700">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
