import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function ContextProvider({ children }) {
  const [sidebar, toggleSidebar] = useState(true);

  return (
    <GlobalContext.Provider value={[sidebar, toggleSidebar]}>
      {children}
    </GlobalContext.Provider>
  );
}
