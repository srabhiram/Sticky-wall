"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

export interface TasksId {
  _id: string;
}

export interface TaskTypes {
  _id: string;
  slice?: any;
  reverse?: any;
  length?: number;
  map(
    arg0: (data: TaskTypes, index: number) => React.JSX.Element
  ): React.ReactNode;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
  user: string;
}

export interface UserData {
  _id: string;
  fullname: string;
  email: string;
  createdAt: Date;
  dueDate: Date;
  tasks: TasksId[];
}

export interface AppContextType {
  taskData: TaskTypes[];
  data: UserData | null;
  loading: boolean;
  fetchTaskData: () => void;
  fetchData: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<UserData | null>(null);
  const [taskData, setTaskData] = useState<TaskTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {

    try {
      const res = await axios.get("/api/profile");
      setData(res.data.data);
    } catch (error: any) {
      console.log("Error fetching data", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskData = useCallback(async () => {
    if (!data?._id) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/tasks", { params: { user: data._id } });
      setTaskData(res.data.data);
    } catch (error: any) {
      console.log("Failed to fetch tasks data", error.message);
    } finally {
      setLoading(false);
    }
  }, [data?._id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchTaskData();
  }, [fetchTaskData]);

  const contextValue: AppContextType = {
    taskData,
    data,
    loading,
    fetchTaskData,
    fetchData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}
