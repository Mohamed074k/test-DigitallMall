import { createContext, useContext, useState } from "react";

const PlatformSettingsContext = createContext();

export function PlatformSettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    siteName: "Digitall Mall",
    logo: null,
    description: "Default description",
    phone: "+20 1019240091",
    email: "ahmedelabd.one@email.com",
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <PlatformSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </PlatformSettingsContext.Provider>
  );
}

export const usePlatformSettings = () => useContext(PlatformSettingsContext);
