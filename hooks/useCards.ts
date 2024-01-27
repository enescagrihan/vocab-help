import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  front: string;
  back: string;
  known: boolean;
  tagId: number;
}

export const useGetLast10Cards = () => {
  return useQuery({
    queryKey: ["getLast10Cards"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5291/Card/GetLast10Records"
      );
      return data;
    },
  });
};

export const useGetCardsByTagId = (tagId: number) => {
  return useQuery({
    queryKey: ["getCardsByTagId"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5291/Card/getByTagId/${tagId}`
      );
      return data;
    },
    enabled: false,
  });
};

export const useGetRandomCard = () => {
  return useQuery({
    queryKey: ["getRandomCard"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5291/Card/GetRandomCard"
      );
      return data;
    },
  });
};

export const useMarkCardAsKnown = (id: number) => {
  return useMutation({
    mutationKey: ["markCardAsKnown"],
    mutationFn: async () => {
      return await axios.put("http://localhost:5291/Card", {
        known: true,
      });
    },
  });
};
