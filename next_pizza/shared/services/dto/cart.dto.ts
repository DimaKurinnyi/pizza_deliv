import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO=CartItem & {
    productItem:ProductItem & {
        product:Product
    }
    ingredients:Ingredient[]
}

export interface cartDTO extends Cart {
    items:CartItemDTO[]
}
export interface CreateCartItemValues {
    productItemId:number
   
    ingredients?:number[]
    
}