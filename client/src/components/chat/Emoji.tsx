"use client";

import { EmojiClickData, Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useClickAway } from "react-use";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface EmojiProps {
  setInput: Dispatch<SetStateAction<string>>;
}

export default function Emoji({ setInput }: EmojiProps) {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const ref = useRef(null);

  useClickAway(ref, () => setShowEmoji(false));

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    console.log(emojiObject);
    setInput((prev) => prev + emojiObject.emoji);
  };
  return (
    <div ref={ref} className="md:pl-4">
      {showEmoji && (
        <div className="absolute bottom-20">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={"dark" as Theme}
          />
        </div>
      )}
      <Smile
        onClick={() => setShowEmoji(!showEmoji)}
        className="w-6 h-6 md:mr-4 cursor-pointer"
      />
    </div>
  );
}
