import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Using the provided Groq API Key
  const apiKey = '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';
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});