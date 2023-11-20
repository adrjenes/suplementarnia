import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { products } = body;

    for (const product of products) {
        const dbProduct = await prisma.product.findUnique({
            where: { id: product.id },
        });

        if (dbProduct && dbProduct.details) {
            let allQuantitiesZero = true; // Zakładamy, że wszystkie ilości są na początku 0

            const updatedDetails = dbProduct.details.map(detail => {
                const purchasedFlavour = product.selectedFlavour.find(flavour => flavour.flavour === detail.flavour);
                if (purchasedFlavour) {
                    const newQuantity = Math.max(0, detail.quantity - purchasedFlavour.quantity);
                    if (newQuantity > 0) allQuantitiesZero = false; // Jeśli jakakolwiek ilość jest większa od 0, aktualizujemy flagę
                    return { ...detail, quantity: newQuantity };
                }
                return detail;
            });

            await prisma.product.update({
                where: { id: product.id },
                data: {
                    details: updatedDetails,
                    inStock: !allQuantitiesZero // Ustawienie inStock na false, jeśli wszystkie ilości to 0
                },
            });
        }
    }

    return NextResponse.json({ message: "Product quantities updated successfully" });
}