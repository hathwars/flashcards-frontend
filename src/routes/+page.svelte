<script lang="ts">
  import { Loader2, Upload } from 'lucide-svelte';
  import flashcardsData from '../data/example_flashcards_data.json';

  let pdfFile: File | null = null;
  let error: string = '';
  let isLoading: boolean = false;

  type FlashCard = {
    question: string;
    sources: string[];
    answer: string;
    isFlipped: boolean;
  }
  let flashcards: FlashCard[] = [];
  let sourcesDropdown: boolean = false;


  function uploadPdfMock() {
    if (!pdfFile) {
      error = 'No file selected';
      return;
    }

    isLoading = true;
    setTimeout(() => {
      flashcards = flashcardsData.map(card => ({ ...card, isFlipped: false }));
      error = '';
      isLoading = false;
    }, 2000); // Simulate 2 seconds of loading time
  }

  async function uploadPdfReal() {
    if (!pdfFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      isLoading = true;
      // TODO: replace with real logs
      console.log(pdfFile?.name)
      console.log(formData)

      const url = import.meta.env.VITE_API_URL
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
    } finally {
      isLoading = false;
    }
  }

  const uploadPdf = import.meta.env.VITE_MODE === 'development' && import.meta.env.VITE_USE_MOCK_DATA === 'true' ? uploadPdfMock : uploadPdfReal;

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
      <button on:click={uploadPdf} class={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        !pdfFile || isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`} disabled={!pdfFile || isLoading}>
        {flashcards.length > 0 ? 'Regenerate Flashcards' : 'Generate Flashcards'}
      </button>
    </div>
    {#if isLoading}
      <div class="flex items-center justify-center space-x-2 mt-4">
        <Loader2 class="animate-spin h-5 w-5 text-indigo-600" />
        <span class="text-indigo-600 font-medium">Generating flashcards...</span>
      </div>
    {/if}
  </div>
  {#if flashcards.length > 0}
  <div class="max-w-4xl w-full mt-8 bg-white p-6 rounded-xl shadow-md h-2/3 overflow-y-auto">
    <div class="overflow-x-auto pb-4">
      <div class="flex space-x-4" style="width: max-content;">
        {#each flashcards as flashcard, index}
        <div role="button" tabindex="0" class="flashcard w-80 h-48 bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer transition-transform duration-300 transform perspective-1000" class:flip={flashcard.isFlipped} on:click={() => flipCard(index)} on:keydown={(event) => handleKeydown(event, index)} aria-label={`Flashcard ${index + 1}: ${flashcard.isFlipped ? 'Answer' : 'Question'}`}>
          <div class="flashcard-inner w-full h-full relative transform-style-3d transition-transform duration-300">
            <div class="flashcard-front absolute w-full h-full backface-hidden flex items-center justify-center p-4">
              <p class="text-sm font-semibold text-center">{flashcard.question}</p>
            </div>
            <div class="flashcard-back absolute w-full h-full backface-hidden flex flex-col justify-between p-4 transform rotate-y-180">
              <div>
                <p class="mt-1 text-sm text-gray-600">{flashcard.answer}</p>
              </div>
              <div class="sources-dropdown">
                <button class="text-sm font-semibold text-gray-800" on:click={(event) => {event.stopPropagation(); sourcesDropdown = !sourcesDropdown;}}>
                  Sources {sourcesDropdown ? '↑' : '↓'}
                </button>
                {#if sourcesDropdown}
                <div class="sources-list text-xs text-gray-600">
                  {#each flashcard.sources as source}
                  <p>{source}</p>
                  {/each}
                </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
  {/if}
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
  .sources-dropdown {
    position: relative;
  }
  .sources-list {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 4px;
    z-index: 1;
  }
</style>