import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // react-globe.gl pulls in its own nested copy of three.js, which otherwise
    // loads alongside any top-level copy and breaks at runtime (e.g. Matrix4
    // instances from one copy aren't recognized by the other). Force every
    // import of 'three' to resolve to a single instance.
    dedupe: ['three'],
  },
})
