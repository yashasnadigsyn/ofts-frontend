document.addEventListener('DOMContentLoaded', function() {
    const photoGrid = document.getElementById('photoGrid');
    const searchBar = document.getElementById('searchBar');
    const featureSection = document.getElementById('featureSection');
    let photosData = [];
    let hasScrolled = false;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            photosData = data;
            displayPhotos(photosData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayPhotos(photos) {
        photoGrid.innerHTML = '';

        photos.forEach(photo => {
            const card = document.createElement('div');
            card.classList.add('photo-card');
            const img = document.createElement('img');

            // Extract the filename from the absolute path
            const fullPath = photo.image_path;
            const demoIndex = fullPath.indexOf("DEMO/");
            if (demoIndex !== -1) {
                const relativePath = fullPath.substring(demoIndex + "DEMO/".length);
                img.src = 'images/' + relativePath; // Assuming images are in 'images/' directory
            } else {
                console.error("Invalid image path:", fullPath); // Handle cases where "DEMO/" is not found
                return; // Skip this photo if path is invalid
            }

            img.alt = photo.caption;

            // Create a div for face names
            const faceNamesDiv = document.createElement('div');
            faceNamesDiv.classList.add('face-names');
            faceNamesDiv.textContent = photo.faces;

            card.appendChild(img);
            card.appendChild(faceNamesDiv);
            photoGrid.appendChild(card);
        });
    }

    // Search functionality (remains the same)
    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredPhotos = photosData.filter(photo => {
            const caption = photo.caption.toLowerCase();
            const faces = photo.faces.toLowerCase();
            return caption.includes(searchTerm) || faces.includes(searchTerm);
        });
        displayPhotos(filteredPhotos);
    });

    // Scroll event listener to show feature section after scrolling once
    window.addEventListener('scroll', function() {
        if (!hasScrolled) {
            featureSection.classList.add('visible');
            hasScrolled = true;
        }
    });
});
