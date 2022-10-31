import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), pluginRewriteAll()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
