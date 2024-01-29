import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/instance";
import { useError } from "@/context/errorContext";
import { ILoginProps } from "@/interfaces/auth";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const AuthApi = {
  useLogin: () => {
    const { setError } = useError();
    return useMutation({
      mutationKey: ["login"],
      mutationFn: async (params: ILoginProps) => {
        try {
          const response = await api.post(`${apiUrl}/auth/login`, params, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          api.defaults.headers[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
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
  useGetMeQuery: () => {
    const { setError } = useError();

    return useQuery({
      queryKey: ["me"],
      queryFn: async () => {
        try {
          const response = await api.get(`${apiUrl}/auth/me`);
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
