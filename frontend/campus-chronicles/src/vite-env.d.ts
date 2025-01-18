/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY: string;
    // add other environment variables here...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }