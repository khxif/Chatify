import { cn } from "@/lib/utils";
import Avatar from "react-avatar";

interface UserAvatarProps {
  size?: string;
  name: string;
  className?: string;
}

export default function UserAvatar({ size, name, className }: UserAvatarProps) {
  return (
    <Avatar
      className={cn("rounded-full w-10 h-10", className)}
      size={size || "45"}
      name={name}
    />
  );
}
