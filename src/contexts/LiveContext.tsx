import { createContext, useState } from "react";

interface LiveContextType {
  isLive: boolean;
  setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LiveContext = createContext<LiveContextType | undefined>(
  undefined,
);

export function LiveContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLive, setIsLive] = useState(false);

  return (
    <LiveContext.Provider
      value={{
        isLive,
        setIsLive,
      }}
    >
      {children}
    </LiveContext.Provider>
  );
}
