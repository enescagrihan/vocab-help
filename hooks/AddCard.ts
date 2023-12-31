import axios from "axios";
import React from "react";

const AddCard = () => {
  return {
    mutationFn: async (data: any) => {
      return await axios.post("http://localhost:5291/Card", data);
    },
    onError: (error: any, variables: any, context: any) => {
      //handle error
    },
    onSuccess: (data: any, variables: any, context: any) => {
      //handle success
    },
  };
};

export default AddCard;
