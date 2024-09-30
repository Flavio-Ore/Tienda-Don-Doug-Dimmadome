import { getAllKardex, getSearchedKardex } from "@/api/kardex"
import { useQuery } from "@tanstack/react-query"

export const useGetSearchedKardex = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useQuery({
    queryKey: ['KARDEX', searchTerm],
    queryFn: async () =>
      await getSearchedKardex(searchTerm)
  })
}

export const useGetAllKardex = () => {
  return useQuery({
    queryKey: ['KARDEX'],
    queryFn: async () => await getAllKardex()
  })
}

