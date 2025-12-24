"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "@/contexts/ThemeContext";

interface ClerkThemeProviderProps {
  children: React.ReactNode;
}

export default function ClerkThemeProvider({
  children,
}: ClerkThemeProviderProps) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: theme === "dark" ? "#ed7c4a" : "#de6135", // primary-500/600
          colorBackground: theme === "dark" ? "#0a0a0a" : "#ffffff",
          colorInputBackground: theme === "dark" ? "#262626" : "#fafafa",
          colorInputText: theme === "dark" ? "#fafafa" : "#171717",
          borderRadius: "1rem",
          fontFamily: "Inter, system-ui, sans-serif",
        },
        elements: {
          formButtonPrimary: {
            background: "linear-gradient(135deg, #ed7c4a 0%, #0ea5e9 50%, #ed7c4a 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #de6135 0%, #0284c7 50%, #de6135 100%)",
            },
            borderRadius: "0.75rem",
            fontWeight: "600",
            boxShadow: "0 10px 25px -5px rgba(237, 124, 74, 0.3)",
          },
          card: {
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(16px)",
            backgroundColor: theme === "dark" ? "rgba(10, 10, 10, 0.9)" : "rgba(255, 255, 255, 0.9)",
            border: theme === "dark" 
              ? "1px solid rgba(64, 64, 64, 0.5)" 
              : "1px solid rgba(229, 231, 235, 0.5)",
            borderRadius: "1.5rem",
          },
          headerTitle: {
            color: theme === "dark" ? "#fafafa" : "#171717",
            fontFamily: "Lexend, system-ui, sans-serif",
            fontWeight: "700",
          },
          headerSubtitle: {
            color: theme === "dark" ? "#a3a3a3" : "#525252",
          },
          socialButtonsBlockButton: {
            border: theme === "dark"
              ? "1px solid rgba(64, 64, 64, 0.5)"
              : "1px solid rgba(229, 231, 235, 0.5)",
            backgroundColor: theme === "dark"
              ? "rgba(38, 38, 38, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            borderRadius: "0.75rem",
            "&:hover": {
              backgroundColor: theme === "dark"
                ? "rgba(64, 64, 64, 0.8)"
                : "rgba(245, 245, 245, 0.8)",
            },
          },
          dividerLine: {
            backgroundColor: theme === "dark"
              ? "rgba(64, 64, 64, 0.5)"
              : "rgba(229, 231, 235, 0.5)",
          },
          dividerText: {
            color: theme === "dark" ? "#a3a3a3" : "#525252",
          },
          formFieldInput: {
            backgroundColor: theme === "dark"
              ? "rgba(38, 38, 38, 0.8)"
              : "rgba(250, 250, 250, 0.8)",
            backdropFilter: "blur(8px)",
            border: theme === "dark"
              ? "2px solid rgba(64, 64, 64, 0.5)"
              : "2px solid rgba(229, 231, 235, 0.5)",
            borderRadius: "0.75rem",
            color: theme === "dark" ? "#fafafa" : "#171717",
            "&:focus": {
              borderColor: theme === "dark" ? "#ed7c4a" : "#de6135",
              boxShadow: theme === "dark" 
                ? "0 0 0 3px rgba(237, 124, 74, 0.1)" 
                : "0 0 0 3px rgba(222, 97, 53, 0.1)",
            },
          },
          formFieldLabel: {
            color: theme === "dark" ? "#d4d4d4" : "#404040",
            fontWeight: "600",
          },
          identityPreviewText: {
            color: theme === "dark" ? "#fafafa" : "#171717",
          },
          identityPreviewEditButton: {
            color: theme === "dark" ? "#ed7c4a" : "#de6135",
          },
          footerActionLink: {
            color: theme === "dark" ? "#ed7c4a" : "#de6135",
            fontWeight: "600",
            "&:hover": {
              color: theme === "dark" ? "#f19a6b" : "#b84d2d",
            },
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
