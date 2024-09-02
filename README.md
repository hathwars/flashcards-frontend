Run production build: 

```bash
pnpm build
```

Run development server: 

```bash
pnpm dev
```

Use environment variables to control the behavior of the app:
* Put these in a .env.local file
* VITE_MODE: "development" or "production"
* VITE_USE_MOCK_DATA: "true" or "false" to control whether we use mock data from src/data/example_flashcards_data.json or the actual backend service
* VITE_API_URL: The URL of the actual backend service for generating flashcards

TODO:
* prepare prod environment and actually build
* add client side logging