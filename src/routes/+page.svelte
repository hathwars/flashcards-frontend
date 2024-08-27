<script lang="ts">
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