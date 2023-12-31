import { Card } from "@/types";
import axios from "axios";

const postCard = async ({ front, back, known }: Card) => {
  return await axios.post("http://localhost:5291/Card");
};


