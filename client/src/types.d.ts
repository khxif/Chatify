interface User {
  _id: string;
  username: string;
  email: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface SelectedUserStore {
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User | null) => void;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
