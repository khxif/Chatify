import { cn } from "@/lib/utils";

interface MessageProps {
  message: Message;
  isUser: boolean;
}

export default function Message({ message, isUser }: MessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full px-4",
        isUser ? " items-end justify-end" : "items-start justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-fit text-sm ",
          isUser ? "bg-blue-400 rounded-tl-md rounded-b-md " : "bg-red-500 rounded-tr-md rounded-b-md",
          "py-2 px-3"
        )}
      >
        {message?.message}
      </div>
    </div>
  );
}
