
import { notFound } from "next/navigation";
import AddToCartForm from "./AddToCart";
import { getMenuItem } from "@/app/lib/api";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps) {
  const item = await getMenuItem(params.id);
  if (!item) {
    return {
      title: "Item Not Found",
    };
  }
  return {
    title: item.name,
    description: item.description,
  };
}

// Mock function to get nutritional info (in a real app, this would come from the API)
function getNutritionalInfo(itemId: string) {
  // This is just mock data, replace with actual data in a real application
  return {
    fat: 15,
    carbohydrate: 30,
    protein: 25,
  };
}

export default async function ItemPage({ params }: PageProps) {
  const item = await getMenuItem(params.id);

  if (!item) {
    notFound();
  }

  const nutritionalInfo = getNutritionalInfo(item.id);

  const extendedItem = {
    ...item,
    nutritionalInfo,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AddToCartForm item={extendedItem} />
    </div>
  );
}
