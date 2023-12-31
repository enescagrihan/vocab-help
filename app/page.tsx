"use client";

import ListItem from "@/components/shared/ListItem";
import TagDropdown from "@/components/shared/TagDropdown";
import AddCard from "@/hooks/AddCard";
import useGetLast10Cards from "@/hooks/useCards";
import { useAddCard } from "@/hooks/useMutateHook";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Home(props: any) {
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const { data: last10Cards, isLoading: isLast10CardsLoading, refetch } =
    useGetLast10Cards();

  const mutation = useMutation({
    mutationKey: ["postCard"],
    mutationFn: async (newTodo) => {
      return await axios.post("http://localhost:5291/Card", {
        front,
        back,
        tagId: selectedTagId,
        known: false,
      });
    },
    onSuccess: () => {
      setFront("")
      setBack("");
      setSelectedTagId(null)
      refetch()
    },
  });

  const handleSubmit = () => {
    console.log("tets");
    mutation.mutate();
  };

  if (isLast10CardsLoading || !last10Cards) {
    return "loading";
  }

  if (mutation.isError) {
    console.log(mutation.error);
    return <p>{mutation.error.message}</p>;
  }

  return (
    <main className="flex flex-col items-center p-24">
      {/* <h1 className="text-3xl">VocabHelp</h1> */}
      <div className="flex flex-col gap-10 items-center pb-16">
        <div className="flex gap-5">
          <input
            value={front}
            className="border border-gray rounded"
            type="text"
            onChange={(e) => setFront(e.target.value)}
          />
          <span>:</span>
          <input
            value={back}
            className="border border-gray rounded"
            type="text"
            onChange={(e) => setBack(e.target.value)}
          />
          <TagDropdown
            url="http://localhost:5291/Card/GetLast10Records"
            setSelectedTagId={setSelectedTagId}
          />
        </div>
        <button
          className="bg-sky-700 text-white rounded w-24"
          type="submit"
          onClick={() => handleSubmit()}
        >
          SAVE
        </button>
      </div>
      <div>
        {!isLast10CardsLoading &&
          last10Cards.map((item: any) => {
            return (
              <ListItem
                back={item.back}
                front={item.front}
                known={false}
                key={item.id}
              />
            );
          })}
      </div>
    </main>
  );
}
