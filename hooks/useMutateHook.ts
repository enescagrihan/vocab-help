import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

// const useMutateHook = async (props: any) => {
//   return await useMutation(props);
// };

const addCard = (card: any) => {
    return axios.post('http://localhost:5291/Card', card)
}

export const useAddCard = () => {
    return useMutation(addCard)
}

// export default useMutateHook;
