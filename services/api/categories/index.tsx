import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";
import { useError } from "@/context/errorContext";
import { ProductListResponse } from "@/interfaces";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const CategoryApi = {
  useGetCategoriesQuery: () => {
    const { setError } = useError();

    return useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        try {
          const response = await api.get(`${apiUrl}/products/categories`);
          return response.data;
        } catch (error) {
          setError(
            (error as any).response?.data?.message || "Bir hata oluştu."
          );
          throw error;
        }
      },
    });
  },
  useGetCategoryProductsQuery: (category: string) => {
    const { setError } = useError();

    return useQuery<ProductListResponse>({
      queryKey: ["category", category],
      queryFn: async () => {
        try {
          const response = await api.get(
            `${apiUrl}/products/category/${category}`
          );
          return response.data;
        } catch (error) {
          setError(
            (error as any).response?.data?.message || "Bir hata oluştu."
          );
          throw error;
        }
      },
    });
  },
};
export { api };
