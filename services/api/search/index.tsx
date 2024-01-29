import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";
import { useError } from "@/context/errorContext";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const SearchApi = {
  useSearch: (searchQuery: string) => {
    const { setError } = useError();

    return useQuery({
      queryKey: ["search", searchQuery],

      queryFn: async () => {
        try {
          const response = await api.get(
            `${apiUrl}/products/search?q=${searchQuery}`
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
