document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target); // Create FormData object

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            alert('File uploaded successfully! Token ID: ' + result.tokenId);
        } else {
            alert('Upload failed: ' + result.message);
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('An error occurred during the upload.');
    }
});

// Retrieve Uploaded Work
document.getElementById('retrieveButton').addEventListener('click', async () => {
    const tokenId = document.getElementById('tokenIdInput').value;

    try {
        const response = await fetch(`/api/work/${tokenId}`);

        if (!response.ok) {
            throw new Error('Work not found');
        }

        const work = await response.json();
        const img = document.getElementById('uploadedImage');
        img.src = `data:image/png;base64,${work.file}`; // Set image source to base64 data
        img.alt = work.originalName;

        document.getElementById('image-container').style.display = 'block'; // Show image container
    } catch (error) {
        console.error('Error retrieving work:', error);
        alert('Error retrieving work: ' + error.message);
    }
});
