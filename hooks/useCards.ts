import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  front: string;
  back: string;
  known: boolean;
  tagId: number;
}

const useGetLast10Cards = () => {
  return useQuery({
    queryKey: ["getLast10Cards"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5291/Card/GetLast10Records"
      );
      return data as Data;
    },
  });
};

export default useGetLast10Cards;
