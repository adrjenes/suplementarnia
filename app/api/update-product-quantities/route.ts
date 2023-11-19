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
            const updatedDetails = dbProduct.details.map(detail => {
                const purchasedFlavour = product.selectedFlavour.find(flavour => flavour.flavour === detail.flavour);
                if (purchasedFlavour) {
                    // Odejmowanie zakupionej ilości od dostępnej ilości
                    return { ...detail, quantity: Math.max(0, detail.quantity - purchasedFlavour.quantity) };
                }
                return detail;
            });

            await prisma.product.update({
                where: { id: product.id },
                data: { details: updatedDetails },
            });
        }
    }

    return NextResponse.json({ message: "Product quantities updated successfully" });
}