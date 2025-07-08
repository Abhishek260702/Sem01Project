import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// This configuration file sets up Vite for a React project, enabling the use of React features and JSX syntax.
// It imports the necessary modules and exports a configuration object that includes the React plugin.
// The configuration is used to build and serve the React application efficiently, leveraging Vite's fast development server and build optimizations.
// The `defineConfig` function is used to define the configuration, which includes the React plugin for handling React files.
// This setup allows developers to create modern web applications with React using Vite as the build tool, providing a smooth development experience with features like hot module replacement 