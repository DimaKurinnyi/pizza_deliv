import { Api } from '@/services/appi-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';


interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);
  return { ingredients, loading, };
};
