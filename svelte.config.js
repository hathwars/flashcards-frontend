import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
  vite: {
    server: {
      fs: {
        allow: ['/Users/shathwar/flashcards-frontend/example_flashcards_data.json'],
      },
    },
  },
}


export default config
