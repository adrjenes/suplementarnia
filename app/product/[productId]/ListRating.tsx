"use client"

import Heading from "@/app/components/Heading";
import moment from "moment";
import {Rating} from "@mui/material";
import Avatar from "@/app/components/Avatar";

interface ListRatingProps {
    product: any;
}

const ListRating: React.FC<ListRatingProps> = ({product}) => {
    return <div>
        <Heading title="Recenzja produktu"/>
        <div className="text-sm mt-2">
            {product.reviews && product.reviews.map((review: any) => {
                return <div key={review.id}
                className="max-w-300px">
                <div className="flex gap-2 items-center">
                    <Avatar src={review?.user.image}/>
                    <div className="font-semibold">{review?.user.name}</div>
                    <div className="font-light">
                    <div>{moment(review.createdDate).fromNow()}</div>
                    </div>
                </div>
                    <div className="mt-2">
                        <Rating value={review.rating} readOnly/>
                        <div className="ml-2">{review.comment}</div>
                        <hr className="mt-8 mb-8"/>
                    </div>
                </div>
            })}
        </div>
    </div>
};
export default ListRating;