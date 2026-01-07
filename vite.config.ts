import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [
    react(),
    //   {
    //   name: 'custom-history-fallback',
    //   configureServer(server) {
    //     server.middlewares.use(
    //       history({
    //         index: '/index.html',
    //         disableDotRule: true,
    //       })
    //     );
    //   },
    // }

  ]
  
});