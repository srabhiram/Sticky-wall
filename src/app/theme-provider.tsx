"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface TasksId {
  _id: string;
}

export interface UserData {
  _id: string;
  fullname: string;
  email: string;
  createdAt: Date;
  dueDate: Date;
  tasks: TasksId[];
}

export const AppContext = createContext<UserData | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    try {
      axios.get("/api/profile").then((res) => setData(res.data.data));
    } catch (error: any) {
      console.log("Error fetching data", error.message);
    }
  }, []); // Ensure the dependency array is empty

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
