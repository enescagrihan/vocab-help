import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  id: number;
  tagName: string;
}

export const useGetTags = () => {
  return useQuery({
    queryKey: ["getAllTags"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5291/Tag");
      return data as Data;
    },
  });
};
