document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(this);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('result').innerHTML = `<p>${data.message}</p><p>Your NFT Token ID: ${data.tokenId}</p>`;
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
