import { sveltekit } from '@sveltejs/kit/vite'
import dotenvExpand from 'dotenv-expand'
import { loadEnv, defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  // This check is important!
  let env = {};
  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '')
    env['VITE_MODE'] = env.MODE
    env['VITE_USE_MOCK_DATA'] = env.USE_MOCK_DATA
    env['VITE_API_URL'] = env.API_URL
    dotenvExpand.expand({ parsed: env })
  }
  return {
    plugins: [sveltekit()],
    env: env
  }
})
