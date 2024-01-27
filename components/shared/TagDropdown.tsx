"use client";

import { useGetTags } from "@/hooks/useTags";
import { Dispatch, SetStateAction } from "react";

interface TagDropdownProps {
  setSelectedTagId: Dispatch<SetStateAction<number>>;
  selectedTagId: number;
}

export default function TagDropdown({
  setSelectedTagId,
  selectedTagId,
}: TagDropdownProps) {
  const { data: tags, isLoading: isLoading } = useGetTags();

  if (isLoading || !tags) {
    return "loading";
  }

  return (
    <select
      className="border border-gray rounded"
      onChange={(e) => {
        // @ts-ignore
        setSelectedTagId(e.target.value);
      }}
    >
      <option selected disabled>
        Select Category
      </option>
      {tags.map((tag: any) => {
        return (
          <option value={tag.id} key={tag.id}>
            {tag.tagName}
          </option>
        );
      })}
    </select>
  );
}
