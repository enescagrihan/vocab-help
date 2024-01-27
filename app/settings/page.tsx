"use client";

import TagDropdown from "@/components/shared/TagDropdown";
import { useGetTags } from "@/hooks/useTags";
import { useState } from "react";
import Delete from "@/public/delete.svg";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@material-tailwind/react";

export default function Settings() {
  const [selectedTagId, setSelectedTagId] = useState<number>();
  const [newTagName, setNewTagName] = useState("");
  const { data, isLoading, refetch } = useGetTags();

  const addTag = useMutation({
    mutationKey: ["addTag"],
    mutationFn: async () => {
      return await axios.post("http://localhost:5291/Tag", {
        tagName: newTagName,
        // cards: [
        //   {
        //     front: "string",
        //     back: "string",
        //     known: true,
        //     tagId: 0,
        //   },
        // ],
      });
    },
    onSuccess: () => {
      refetch();
      setNewTagName("");
    },
  });

  const handleRename = useMutation({
    mutationKey: ["renameTag"],
    mutationFn: async (id: number) => {
      return await axios.put(
        `http://localhost:5291/Tag/editTagName/${id}`,
        {
          id: id,
          tagName: newTagName,
        }
      );
    },
    onSuccess: async () => {
      refetch();
    },
  });

  const deleteTag = useMutation({
    mutationKey: ["deleteTag"],
    mutationFn: async (id: number) => {
      return await axios.delete("http://localhost:5291/Tag", {
        params: { id },
      });
    },
    onSuccess: () => {
      console.log("card updated");
      refetch();
    },
  });

  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-12 items-center pb-16">
      <div className="flex flex-col items-center">
        <p className="mb-4">Add Category</p>
        <div className="flex gap-5">
          <input
            value={newTagName}
            className="border border-gray rounded"
            type="text"
            onChange={(e) => setNewTagName(e.target.value)}
          />
          <Button
            // className="bg-sky-700 text-white rounded w-24"
            placeholder="Add Tag"
            type="submit"
            onClick={() => {
              addTag.mutate();
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-4 text-center">Available Categories</p>
        <div className="flex flex-col gap-4">
          {data.map((tag: any) => {
            return (
              <div className="flex gap-10">
                <p className="flex-1 text-right">{tag.tagName}</p>
                <Button
                  placeholder="Delete"
                  // className="bg-red-500 rounded"
                  onClick={() => {
                    deleteTag.mutate(tag.id);
                  }}
                  color="red"
                  size="sm"
                >
                  <Image src={Delete} alt="Delete" />
                </Button>
                <input
                  // value={front}
                  className="border border-gray rounded"
                  type="text"
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <Button
                  placeholder="Rename"
                  // className="bg-sky-700 text-white rounded w-24"
                  type="submit"
                  size="sm"
                  // disabled={selectedTagId == undefined}
                  onClick={() => handleRename.mutate(tag.id)}
                >
                  RENAME
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      {/* <TagDropdown setSelectedTagId={setSelectedTagId} /> */}
    </div>
  );
}
