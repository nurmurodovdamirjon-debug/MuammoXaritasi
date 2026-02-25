import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
    build: {
        target: 'es2020',
        chunkSizeWarningLimit: 1800,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    query: ['@tanstack/react-query'],
                    supabase: ['@supabase/supabase-js'],
                    map: ['leaflet'],
                    store: ['zustand'],
                },
            },
        },
    },
    server: { port: 3000, host: true },
});
