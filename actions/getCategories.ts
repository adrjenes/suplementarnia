
export interface IProductCategoriesParams {
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getProducts(params: IProductCategoriesParams) {

    try {
        const { searchTerm } = params;
        let searchString = searchTerm || '';

        let query = {
            category: 'Kreatyna', // Ustawiamy kategorię na 'Kreatyna'
            OR: [
                {
                    name: {
                        contains: searchString,
                        mode: 'insensitive'
                    },
                    description: {
                        contains: searchString,
                        mode: 'insensitive'
                    }
                }
            ]
        };

        const products = await prisma.product.findMany({
            where: query,
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}


