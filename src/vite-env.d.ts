/// <reference types="vite/client" />

interface Window {
  ai?: {
    languageModel?: {
      create: (options?: any) => Promise<{
        prompt: (text: string) => Promise<string>;
      }>;
    };
  };
}
