<!-- <script lang="ts">
  let pdfFile: File | null = null;
  
  type FlashCard = {
    question: string;
    sources: string[];
    answer: string;
  }

  let flashcards: FlashCard[] = [];

  async function uploadPdf() {
    if (!pdfFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      console.log(pdfFile?.name)
      console.log(formData)
      // TODO environment variable
      const url = 'https://web-dximtpyqdxz3.up-de-fra1-k8s-1.apps.run-on-seenode.com/uploadpdf/'
      const response = await fetch(url, {
        method: 'POST',
        body: formData,    
        headers: {
          'accept': 'application/json'
        },
        mode: 'cors', // Enable CORS
      });

      if (response.ok) {
        flashcards = await response.json();
        console.log(flashcards);
      } else {
        console.error('Error uploading PDF:', response.status);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  }

  function handleFileUpload(event: any) {
  pdfFile = event.currentTarget.files?.[0] ?? null;
  }
</script>

<h1>Upload PDF to Generate Flashcards</h1>

<form>
  <input type="file" accept=".pdf" on:change={handleFileUpload} />
  <button on:click={uploadPdf}>Upload PDF</button>
</form>

{#if flashcards.length > 0}
  <h2>Flashcards:</h2>
  {#each flashcards as flashcard}
    <div class="flashcard">
      <h3>Question:</h3>
      <p>{flashcard.question}</p>
      <h3>Answer:</h3>
      <p>{flashcard.answer}</p>
      <h3>Source:</h3>
      <p>{flashcard.sources}</p>
    </div>
  {/each}
{/if}
# #######
<script>
  import { Upload } from 'lucide-svelte';
  
  let file = null;
  let error = '';

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      file = selectedFile;
      error = '';
    } else {
      file = null;
      error = 'Please select a valid PDF file.';
    }
  }

  function handleUpload() {
    if (file) {
      // Here you would implement the actual file upload and processing logic
      console.log('Uploading file:', file.name);
      // After successful upload, you might want to redirect the user or show a success message
    } else {
      error = 'Please select a PDF file before uploading.';
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
    <div class="text-center">
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">PDF to Flashcards</h2>
      <p class="mt-2 text-sm text-gray-600">Upload your PDF and get study-ready flashcards in seconds!</p>
    </div>
    <div class="mt-8 space-y-6">
      <div class="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <Upload class="mx-auto h-12 w-12 text-gray-400" />
          <div class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a PDF</span>
              <input id="file-upload" name="file-upload" type="file" class="sr-only" on:change={handleFileChange} accept=".pdf" />
            </label>
          </div>
          <p class="text-xs text-gray-500">{file ? file.name : 'PDF up to 10MB'}</p>
        </div>
      </div>
      {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{error}</span>
        </div>
      {/if}
      <button 
        on:click={handleUpload} 
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={!file}
      >
        Generate Flashcards
      </button>
    </div>
  </div>
</div>

<style>
  /* You can add any additional styles here if needed */
</style> -->
<!-- TODO: retain -->
<!-- <script lang="ts">
  import { Upload } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import flashcardsData from '/Users/shathwar/flashcards-frontend/example_flashcards_data.json';

  let pdfFile: File | null = null;
  let error: string = '';

  type FlashCard = {
    question: string;
    sources: string[];
    answer: string;
  }
  let flashcards: FlashCard[] = [];

  onMount(() => {
    // Load flashcards from local JSON file on component mount
    flashcards = flashcardsData;
  });

  async function uploadPdf() {
    if (!pdfFile) {
      error = 'No file selected';
      return;
    }
    // For testing, we'll just use the local JSON data instead of making an API call
    flashcards = flashcardsData;
    error = '';
  }

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      pdfFile = target.files[0];
      error = '';
    }
  }

  // async function uploadPdf() {
  //   if (!pdfFile) {
  //     error = 'No file selected';
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('file', pdfFile);
  //   try {
  //     console.log(pdfFile?.name)
  //     console.log(formData)
  //     // TODO environment variable
  //     // TODO: change this back
  //     // const url = 'https://web-dximtpyqdxz3.up-de-fra1-k8s-1.apps.run-on-seenode.com/uploadpdf/'
  //     const response = await fetch("/Users/shathwar/flashcards-frontend/example_flashcards_data.json",
  //     {method: 'GET', body: formData}
  //     );

  //     // const response = await fetch(url, {
  //     //   method: 'POST',
  //     //   body: formData,
  //     //   headers: {
  //     //     'accept': 'application/json'
  //     //   },
  //     //   mode: 'cors', // Enable CORS
  //     // });
  //     console.log(response)
  //     if (response.ok) {
  //       flashcards = await response.json();
  //       console.log(flashcards);
  //       error = '';
  //     } else {
  //       error = 'Error uploading PDF: ' + response.status;
  //     }
  //   } catch (error) {
  //     console.error('Error uploading PDF:', error);
  //     error = 'Error uploading PDF. Please try again.';
  //   }
  // }

  // function handleFileUpload(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   if (target.files) {
  //     pdfFile = target.files[0];
  //     error = '';
  //   }
  // }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  <div class="max-w-2xl w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
    <div class="text-center">
      <h1 class="mt-6 text-3xl font-extrabold text-gray-900">PDF to Flashcards</h1>
      <p class="mt-2 text-sm text-gray-600">Upload your PDF and get study-ready flashcards in seconds!</p>
    </div>
    <div class="mt-8 space-y-6">
      <div class="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <Upload class="mx-auto h-12 w-12 text-gray-400" />
          <div class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a PDF</span>
              <input id="file-upload" name="file-upload" type="file" class="sr-only" on:change={handleFileUpload} accept=".pdf" />
            </label>
          </div>
          <p class="text-xs text-gray-500">{pdfFile ? pdfFile.name : 'PDF up to 10MB'}</p>
        </div>
      </div>
      {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{error}</span>
        </div>
      {/if}
      <button 
        on:click={uploadPdf} 
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={!pdfFile}
      >
        Generate Flashcards
      </button>
    </div>

    {#if flashcards.length > 0}
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Flashcards:</h2>
      <div class="space-y-4">
        {#each flashcards as flashcard}
          <div class="flashcard bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 class="text-lg font-semibold text-gray-800">Question:</h3>
            <p class="mt-1 text-gray-600">{flashcard.question}</p>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">Answer:</h3>
            <p class="mt-1 text-gray-600">{flashcard.answer}</p>
            <h3 class="text-lg font-semibold text-gray-800 mt-4">Source:</h3>
            <p class="mt-1 text-gray-600">{flashcard.sources.join(', ')}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  /* You can add any additional styles here if needed */
</style> -->

<!-- try 2 -->

<script lang="ts">
  import { Upload } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import flashcardsData from '/Users/shathwar/flashcards-frontend/src/data/example_flashcards_data.json';

  let pdfFile: File | null = null;
  let error: string = '';

  type FlashCard = {
    question: string;
    sources: string[];
    answer: string;
    isFlipped: boolean;
  }
  let flashcards: FlashCard[] = [];

  onMount(() => {
    // Load flashcards from local JSON file on component mount
    flashcards = flashcardsData.map(card => ({ ...card, isFlipped: false }));
  });

  function uploadPdf() {
    if (!pdfFile) {
      error = 'No file selected';
      return;
    }
    // For testing, we'll just use the local JSON data instead of making an API call
    flashcards = flashcardsData.map(card => ({ ...card, isFlipped: false }));
    error = '';
  }

  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      pdfFile = target.files[0];
      error = '';
    }
  }

  function flipCard(index: number) {
    flashcards[index].isFlipped = !flashcards[index].isFlipped;
    flashcards = [...flashcards];
  }

  function handleKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipCard(index);
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  <div class="max-w-4xl w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
    <div class="text-center">
      <h1 class="mt-6 text-3xl font-extrabold text-gray-900">PDF to Flashcards</h1>
      <p class="mt-2 text-sm text-gray-600">Upload your PDF and get study-ready flashcards in seconds!</p>
    </div>
    <div class="mt-8 space-y-6">
      <div class="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <Upload class="mx-auto h-12 w-12 text-gray-400" />
          <div class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a PDF</span>
              <input id="file-upload" name="file-upload" type="file" class="sr-only" on:change={handleFileUpload} accept=".pdf" />
            </label>
          </div>
          <p class="text-xs text-gray-500">{pdfFile ? pdfFile.name : 'PDF up to 10MB'}</p>
        </div>
      </div>
      {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{error}</span>
        </div>
      {/if}
      <button 
        on:click={uploadPdf} 
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={!pdfFile}
      >
        Generate Flashcards
      </button>
    </div>

    {#if flashcards.length > 0}
  <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Flashcards:</h2>
  <div class="overflow-x-auto pb-4">
    <div class="flex space-x-4" style="width: max-content;">
      {#each flashcards as flashcard, index}
        <div 
          role="button"
          tabindex="0"
          class="flashcard w-80 h-48 bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer transition-transform duration-300 transform perspective-1000"
          class:flip={flashcard.isFlipped}
          on:click={() => flipCard(index)}
          on:keydown={(event) => handleKeydown(event, index)}
          aria-label={`Flashcard ${index + 1}: ${flashcard.isFlipped ? 'Answer' : 'Question'}`}
        >
          <div class="flashcard-inner w-full h-full relative transform-style-3d transition-transform duration-300">
            <div class="flashcard-front absolute w-full h-full backface-hidden flex items-center justify-center p-4">
              <p class="text-lg font-semibold text-center">{flashcard.question}</p>
            </div>
            <div class="flashcard-back absolute w-full h-full backface-hidden flex flex-col justify-between p-4 transform rotate-y-180">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Answer:</h3>
                <p class="mt-1 text-gray-600">{flashcard.answer}</p>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-800">Source:</h3>
                <p class="text-xs text-gray-600">{flashcard.sources.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
  </div>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .flip .flashcard-inner {
    transform: rotateY(180deg);
  }
</style>