"use client";

import Image from "next/image";
import WrongAnswer from "@/public/wrong-answer.svg";
import RightAnswer from "@/public/right-answer.svg";
import { useState } from "react";
import { useGetRandomCard, useMarkCardAsKnown } from "@/hooks/useCards";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@material-tailwind/react";

export default function Exercise() {
  const [answer, setAnswer] = useState("");
  const [checkAnswer, setCheckAnswer] = useState(false);

  const { data, isLoading, refetch } = useGetRandomCard();

  const mutation = useMutation({
    mutationKey: ["markCardAsKnown"],
    mutationFn: async () => {
      return await axios.put(
        "http://localhost:5291/Card/MarkCardAsKnown/" + data.id
      );
    },
    onSuccess: () => {
      console.log("card updated");
    },
  });

  const handleMutate = () => {
    mutation.mutate();
  };

  if (isLoading || !data) {
    return <p>loading...</p>;
  }

  if (mutation.isError) {
    console.log(mutation.error);
    return <p>{mutation.error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-10 items-center pb-16">
      <div className="flex gap-10">
        <div className="flex gap-5">
          <p className=" text-left">{data.front}</p>
          <span>:</span>
          <input
            value={answer}
            className="border border-gray rounded"
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            onFocus={() => {
              checkAnswer && setCheckAnswer(false);
            }}
          />
        </div>
        <Button
          onClick={() => {
            setCheckAnswer(true);
          }}
        >
          Check
        </Button>
      </div>
      <div>
        {checkAnswer &&
          (answer == data.back ? (
            <Image src={RightAnswer} alt="Right Answer" />
          ) : (
            <Image src={WrongAnswer} alt="Wrong Answer" />
          ))}
      </div>
      <div className="flex gap-10">
        <Button onClick={() => handleMutate()}>Mark as Known</Button>
        <Button
          onClick={() => {
            setCheckAnswer(false);
            setAnswer("");
            refetch();
          }}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
}
