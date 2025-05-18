import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";
type ThemeColor = "purple" | "blue" | "red" | "green";

interface Theme {
  [key: string]: string;
}

interface ThemeContextProps {
  theme: ThemeMode;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  colorTheme: ThemeColor;
  setColorTheme: React.Dispatch<React.SetStateAction<ThemeColor>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getInitialTheme = (): ThemeMode => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as ThemeMode | null;
      if (storedTheme) return storedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const getInitialColor = (): ThemeColor => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem(
        "colorTheme"
      ) as ThemeColor | null;
      if (storedColor) return storedColor;
    }
    return "purple"; // default color theme
  };

  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [colorTheme, setColorTheme] = useState<ThemeColor>(getInitialColor);

  // Define color themes
  const baseThemes: Record<ThemeColor, Theme> = {
    purple: {
      "--gradient-from": "#7e5af0", // purple-500
      "--gradient-via": "#d946ef", // fuchsia-500
      "--gradient-to": "#ec4899", // pink-500
      "--gradient-hover-from": "#6d4ae8", // purple-600
      "--gradient-hover-via": "#c026d3", // fuchsia-600
      "--gradient-hover-to": "#db2777", // pink-600
      "--btn-primary-bg": "#7e5af0",
      "--btn-primary-hover": "#6d4ae8",
      "--border-accent": "#a855f7",
      "--accent-primary-bg": "#d946ef", // fuchsia
      "--accent-primary-bg-hover": "#ec4899", // pink
    },
    blue: {
      "--gradient-from": "#3b82f6", // blue-500
      "--gradient-via": "#06b6d4", // cyan-500
      "--gradient-to": "#10b981", // emerald-500
      "--gradient-hover-from": "#2563eb", // blue-600
      "--gradient-hover-via": "#0891b2", // cyan-600
      "--gradient-hover-to": "#059669", // emerald-600
      "--btn-primary-bg": "#3b82f6",
      "--btn-primary-hover": "#2563eb",
      "--border-accent": "#3b82f6",
      "--accent-primary-bg": "#0ea5e9", // sky-500
      "--accent-primary-bg-hover": "#0284c7", // sky-600
    },
    red: {
      "--gradient-from": "#ef4444", // red-500
      "--gradient-via": "#f97316", // orange-500
      "--gradient-to": "#f59e0b", // amber-500
      "--gradient-hover-from": "#b91c1c", // red-700
      "--gradient-hover-via": "#ea580c", // orange-600
      "--gradient-hover-to": "#d97706", // amber-600
      "--btn-primary-bg": "#ef4444",
      "--btn-primary-hover": "#b91c1c",
      "--border-accent": "#ef4444",
      "--accent-primary-bg": "#f97316", // orange-500
      "--accent-primary-bg-hover": "#ea580c", // orange-600
    },
    green: {
      "--gradient-from": "#22c55e", // green-500
      "--gradient-via": "#84cc16", // lime-500
      "--gradient-to": "#eab308", // yellow-500
      "--gradient-hover-from": "#15803d", // green-700
      "--gradient-hover-via": "#65a30d", // lime-600
      "--gradient-hover-to": "#ca8a04", // yellow-600
      "--btn-primary-bg": "#22c55e",
      "--btn-primary-hover": "#15803d",
      "--border-accent": "#84cc16",
      "--accent-primary-bg": "#84cc16", // lime
      "--accent-primary-bg-hover": "#eab308", // yellow
    },
  };

  // Define light and dark base themes
  const lightBase: Theme = {
    "--bg-page": "#f9f9f9",
    "--bg-surface": "#ffffff",
    "--bg-header": "#ffffff",
    "--text-primary": "#212529",
    "--text-secondary": "#6c757d",
    "--text-accent": "#212529", // light neutral
    "--border-muted": "#ced4da",
    "--custom-navbar": "#dfdfdf",
    "--custom-main-text": "#000000",
    "--custom-bg-one": "#d4d4d8",
    "--custom-bg-two": "#a1a1aa",
    "--custom-bg-three": "#d4d4d8",
    "--custom-small-text": "#374151",
    "--custom-home-bg": "#F0F0F080",
    "--custom-sub-text": "#d1d5db",
    "--custom-add-device": "#d1d5db",
    "--custom-green-button": "#22c55e",
    "--custom-green-buttonhover": "#15803d",
    "--custom-add-edit": "#c1c1c7",
    "--custom-settings": "#d4d4d8",
    "--custom-settings-mode": "#a1a1aa",
    "--custom-settings-hover": "#71717a",
  };

  const darkBase: Theme = {
    "--bg-page": "#090607",
    "--bg-surface": "#090607",
    "--bg-header": "#09060780",
    "--text-primary": "#f8fafc",
    "--text-accent": "#a8b3cf", // light neutral
    "--text-secondary": "#94a3b8",
    "--accent-primary-bg": "#7e5af0",
    "--accent-primary-bg-hover": "#6d4ae8",
    "--border-muted": "#475569",
    "--custom-navbar": "#121212",
    "--custom-main-text": "#ffffff",
    "--custom-bg-one": "#18181b",
    "--custom-bg-two": "#27272a",
    "--custom-bg-three": "#3f3f46",
    "--custom-small-text": "#9ca3af",
    "--custom-home-bg": "#00000080",
    "--custom-sub-text": "#1f2937",
    "--custom-add-device": "#4b5563",
    "--custom-green-button": "#15803d",
    "--custom-green-buttonhover": "#22c55e",
    "--custom-add-edit": "#3f3f46",
    "--custom-settings": "#27272a",
    "--custom-settings-mode": "#52525b",
    "--custom-settings-hover": "#18181b",
  };

  useEffect(() => {
    const root = document.documentElement;

    const systemDark =
      theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeTheme = theme === "dark" || systemDark ? darkBase : lightBase;

    const activeGradient = baseThemes[colorTheme];

    const combinedTheme = {
      ...activeTheme,
      ...activeGradient,
    };

    // Apply the theme
    Object.entries(combinedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Set the theme class (for dark mode)
    root.classList.remove("dark", "light");
    root.classList.add(
      theme === "system" ? (systemDark ? "dark" : "light") : theme
    );

    // Store in localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("colorTheme", colorTheme);
  }, [theme, colorTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, colorTheme, setColorTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
