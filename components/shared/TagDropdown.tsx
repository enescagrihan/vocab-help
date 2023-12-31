"use client";

import { useGetTags } from "@/hooks/useTags";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

interface TagDropdownProps {
  url: string;
  setSelectedTagId: Dispatch<SetStateAction<undefined>>;
}

export default function TagDropdown({
  setSelectedTagId,
  url,
}: TagDropdownProps) {
  const { data: tags, isLoading: isLoading } = useGetTags();

  if (isLoading || !tags) {
    return "loading";
  }

  return (
    <select
      className="border border-gray rounded"
      onChange={(e) => setSelectedTagId(e.target.value)}
    >
      <option value="" selected disabled hidden>
        Select Tag
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
