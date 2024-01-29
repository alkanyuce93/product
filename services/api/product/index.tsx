import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";
import { useError } from "@/context/errorContext";
import { Product, ProductListResponse } from "@/interfaces";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const ProductApi = {
  useGetProductDetailQuery: (id: number) => {
    const { setError } = useError();

    return useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
        try {
          const response = await api.get(`${apiUrl}/products/${id}`);
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
  useGetAllProductsQuery: (): UseQueryResult<ProductListResponse, Error> => {
    const { setError } = useError();

    return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        try {
          const response = await api.get<ProductListResponse>(
            `${apiUrl}/products`
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
