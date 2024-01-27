"use client";

// import ListItem from "@/components/shared/ListItem";
import TagDropdown from "@/components/shared/TagDropdown";
import { useGetLast10Cards } from "@/hooks/useCards";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  extractSentences,
  generateText,
  generateTextByLevelOrType,
} from "./api/gemini";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  ButtonGroup,
  Input,
  ListItem,
  Typography,
} from "@material-tailwind/react";

export default function Home(props: any) {
  const [selectedTagId, setSelectedTagId] = useState<number>();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [textToGenerateSentence, setTextToGenerateSentence] = useState("");

  const {
    data: last10Cards,
    isLoading: isLast10CardsLoading,
    refetch,
  } = useGetLast10Cards();

  const mutation = useMutation({
    mutationKey: ["postCard"],
    mutationFn: async () => {
      return await axios.post("http://localhost:5291/Card", {
        front,
        back,
        tagId: selectedTagId,
        known: false,
        example: await generateText(front),
      });
    },
    onSuccess: async () => {
      // await generateText(front);
      setFront("");
      setBack("");
      //setSelectedTagId(undefined);
      refetch();
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const handleAddBeginnerSentence = useMutation({
    mutationKey: ["addBeginnerSentence"],
    mutationFn: async (id: number) => {
      const sentence = await generateTextByLevelOrType(
        textToGenerateSentence,
        "beginner"
      );
      return await axios.put(
        `http://localhost:5291/Card/addMoreExample/${id}`,
        {
          id: id,
          sentence: sentence,
        }
      );
    },
    onSuccess: async () => {
      refetch();
    },
  });

  const handleAddIntermediateSentence = useMutation({
    mutationKey: ["addBeginnerSentence"],
    mutationFn: async (id: number) => {
      const sentence = await generateTextByLevelOrType(
        textToGenerateSentence,
        "intermediate"
      );
      return await axios.put(
        `http://localhost:5291/Card/addMoreExample/${id}`,
        {
          id: id,
          sentence: sentence,
        }
      );
    },
    onSuccess: async () => {
      refetch();
    },
  });

  const handleAddAdvancedSentence = useMutation({
    mutationKey: ["addBeginnerSentence"],
    mutationFn: async (id: number) => {
      const sentence = await generateTextByLevelOrType(
        textToGenerateSentence,
        "advanced"
      );
      return await axios.put(
        `http://localhost:5291/Card/addMoreExample/${id}`,
        {
          id: id,
          sentence: sentence,
        }
      );
    },
    onSuccess: async () => {
      refetch();
    },
  });

  const handleAddQuestionSentence = useMutation({
    mutationKey: ["addBeginnerSentence"],
    mutationFn: async (id: number) => {
      const sentence = await generateTextByLevelOrType(
        textToGenerateSentence,
        "question"
      );
      return await axios.put(
        `http://localhost:5291/Card/addMoreExample/${id}`,
        {
          id: id,
          sentence: sentence,
        }
      );
    },
    onSuccess: async () => {
      refetch();
    },
  });

  if (isLast10CardsLoading || !last10Cards) {
    return "loading";
  }

  if (handleAddBeginnerSentence.isError) {
    console.log(handleAddBeginnerSentence.error);
    return <p>{handleAddBeginnerSentence.error.message}</p>;
  }

  if (mutation.isError) {
    console.log(mutation.error);
    return <p>{mutation.error.message}</p>;
  }

  return (
    <main className="flex flex-col items-center p-24">
      {/* <h1 className="text-3xl">VocabHelp</h1> */}
      <div className="flex flex-col gap-10 items-center pb-16">
        <div className="flex gap-5 items-center">
          <Input
            label="Front"
            value={front}
            className="border border-gray rounded"
            type="text"
            onChange={(e) => setFront(e.target.value)}
          />
          <span>:</span>
          <Input
            label="Back"
            value={back}
            // className="border border-gray rounded"
            type="text"
            onChange={(e) => setBack(e.target.value)}
          />
          <TagDropdown
            url="http://localhost:5291/Card/GetLast10Records"
            setSelectedTagId={setSelectedTagId}
          />
        </div>
        <Button
          placeholder="Submit"
          loading={mutation.isPending}
          type="submit"
          disabled={selectedTagId == undefined || mutation.isPending}
          onClick={() => handleSubmit()}
        >
          {mutation.isPending ? "Loading" : "Save"}
        </Button>
      </div>
      <div>
        {!isLast10CardsLoading &&
          last10Cards.map((item: any) => {
            return (
              <Accordion
                placeholder="test"
                open={true}
                icon={
                  <ButtonGroup placeholder="test" size="sm">
                    <Button
                      placeholder="test"
                      onClick={() => {
                        setTextToGenerateSentence(item.front);
                        handleAddBeginnerSentence.mutate(item.id);
                      }}
                    >
                      Beginner
                    </Button>
                    <Button
                      placeholder="test"
                      onClick={() => {
                        setTextToGenerateSentence(item.front);
                        handleAddIntermediateSentence.mutate(item.id);
                      }}
                    >
                      Intermediate
                    </Button>
                    <Button
                      placeholder="test"
                      onClick={() => {
                        setTextToGenerateSentence(item.front);
                        handleAddAdvancedSentence.mutate(item.id);
                      }}
                    >
                      Advanced
                    </Button>
                    <Button placeholder="test"
                    onClick={() => {
                      setTextToGenerateSentence(item.front);
                      handleAddQuestionSentence.mutate(item.id);
                    }}
                    >Question</Button>
                  </ButtonGroup>
                }
              >
                <AccordionHeader
                  placeholder="test"
                  // className="gap-5"
                >
                  <div className="flex gap-5">
                    {item.known ? (
                      <svg
                        width={24}
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="green"
                      >
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2"></path>
                      </svg>
                    ) : (
                      <svg
                        width={24}
                        focusable="false"
                        fill="red"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2"></path>
                      </svg>
                    )}
                    <Typography
                      placeholder="Card Front"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.front}
                    </Typography>
                    <Typography placeholder=":" style={{ fontWeight: "bold" }}>
                      :
                    </Typography>
                    <Typography
                      style={{ fontWeight: "bold" }}
                      placeholder="Card Back"
                    >
                      {item.back}
                    </Typography>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {extractSentences(item.example).map((sentence) => (
                    <Typography
                      className="flex-1"
                      style={{ flex: 5 }}
                      placeholder="Card Example"
                    >
                      {sentence}
                    </Typography>
                  ))}
                </AccordionBody>
              </Accordion>
              // <ListItem
              //   placeholder="ListItem"
              //   className="gap-5 group py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-500 hover:text-white focus:bg-gray-500 focus:text-white"
              // >
              //   {item.known ? (
              //     <svg
              //       width={24}
              //       focusable="false"
              //       aria-hidden="true"
              //       viewBox="0 0 24 24"
              //       fill="green"
              //     >
              //       <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2"></path>
              //     </svg>
              //   ) : (
              //     <svg
              //       width={24}
              //       focusable="false"
              //       fill="red"
              //       aria-hidden="true"
              //       viewBox="0 0 24 24"
              //     >
              //       <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2"></path>
              //     </svg>
              //   )}

              //   <Typography
              //     className="flex-1 text-right"
              //     placeholder="Card Front"
              //   >
              //     {item.front}
              //   </Typography>
              //   <Typography placeholder=":">:</Typography>
              //   <Typography
              //     className="flex-1 text-left"
              //     placeholder="Card Back"
              //   >
              //     {item.back}
              //   </Typography>
              //   <Typography
              //     className="flex-1"
              //     style={{ flex: 5 }}
              //     placeholder="Card Example"
              //   >
              //     {item.example}
              //   </Typography>
              // </ListItem>
            );
          })}
      </div>
    </main>
  );
}
