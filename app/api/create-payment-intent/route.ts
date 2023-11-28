import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import {NextResponse} from "next/server";
import {getCurrentUser} from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});
export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({error: 'Niezautoryzowano'}, {status: 401})
    }
    const body = await request.json();
    const {
        items,
        totalAmount,
        payment_intent_id
    }: { totalAmount: string, items: [], payment_intent_id: string | null } = body;

    if (payment_intent_id !== null && items !== null) {
        const total = parseFloat(totalAmount);
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if (current_intent) {
            const [existing_order, updated_order] = await Promise.all([
                prisma.order.findFirst({
                    where: {paymentIntentId: payment_intent_id},
                }),
                prisma.order.update({
                    where: {paymentIntentId: payment_intent_id},
                    data: {
                        amount: total,
                        products: items,
                    }
                })
            ]);
            for (const product of items) {
                const dbProduct = await prisma.product.findUnique({
                    where: {id: product.id},
                });
                if (dbProduct && dbProduct.details) {
                    const updatedDetails = dbProduct.details.map((detail: { flavour: string, quantity: number }) => {
                        const purchasedFlavour = product.selectedFlavour.find(flavour => flavour.flavour === detail.flavour);
                        if (purchasedFlavour) {
                            // Odejmowanie zakupionej ilości od dostępnej ilości
                            return {...detail, quantity: Math.max(0, detail.quantity - purchasedFlavour.quantity)};
                        }
                        return detail;
                    });
                    await prisma.product.update({
                        where: {id: product.id},
                        data: {details: updatedDetails},
                    });
                }
            }
            if (current_intent.status === 'succeeded') {
                await prisma.order.update({
                    where: {paymentIntentId: payment_intent_id},
                    data: {
                        status: 'complete',
                    }
                });
            }
            return NextResponse.json({updated_order})
        }
    } else {
        const paymentIntent = stripe.paymentIntents.create({
            amount: parseFloat(totalAmount) * 100,
            currency: "pln",
            payment_method_types: ["card"],
        });
        return await paymentIntent.then(async (result) => {
            // create the order
            const orderData = {
                user: {connect: {id: currentUser.id}},
                amount: parseFloat(totalAmount) * 100,
                currency: 'usd',
                status: "pending",
                deliveryStatus: "pending",
                paymentIntentId: result.id,
                products: items
            }
            const order = await prisma.order.create({
                data: orderData,
            });
            return NextResponse.json({order, paymentIntent: result});
        }).catch((err) => {
            console.log(err)
            return NextResponse.json({error: err.message}, {status: 400})
        });
    }
}