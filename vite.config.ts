import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // تحميل المتغيرات من النظام (مثل Netlify)
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // تمرير المفتاح للكود بأمان
      'process.env.API_KEY': JSON.stringify(env.GROQ_API_KEY),
    },
  };
});
