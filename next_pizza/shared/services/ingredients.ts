import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoute } from "./constance";

export const getAll =async ():Promise<Ingredient[]>=>{
    return (await axiosInstance.get<Ingredient[]>(ApiRoute.INGREDIENTS)).data
}