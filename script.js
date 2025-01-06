document.addEventListener('DOMContentLoaded', function () {
    const photoGrid = document.getElementById('photoGrid');
    const searchBar = document.getElementById('searchBar');
    const featureSection = document.getElementById('featureSection');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');
    let photosData = [];
    let hasScrolled = false;

    // Fetch data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            photosData = data;
            console.log('Photos Data:', photosData); // Debugging
            displayPhotos(photosData);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display photos
    function displayPhotos(photos) {
        photoGrid.innerHTML = ''; // Clear the grid

        console.log('Displaying Photos:', photos); // Debugging

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

            // Add click event to open the image in a modal
            img.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                document.body.classList.add('modal-open'); // Prevent background scrolling
            });

            // Create a div for face names
            const faceNamesDiv = document.createElement('div');
            faceNamesDiv.classList.add('face-names');
            faceNamesDiv.textContent = photo.faces;

            card.appendChild(img);
            card.appendChild(faceNamesDiv);
            photoGrid.appendChild(card);
        });
    }

    // Search functionality
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase().trim();
        const searchTerms = searchTerm.split(/\s+/);

        console.log('Search Term:', searchTerm); // Debugging
        console.log('Search Terms:', searchTerms); // Debugging

        const filteredPhotos = photosData.filter(photo => {
            const caption = photo.caption.toLowerCase();
            const faces = photo.faces.toLowerCase();

            console.log('Caption:', caption, 'Faces:', faces); // Debugging

            return searchTerms.every(term => caption.includes(term) || faces.includes(term));
        });

        console.log('Filtered Photos:', filteredPhotos); // Debugging
        displayPhotos(filteredPhotos);
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Re-enable background scrolling
    });

    // Close the modal when clicking outside the image
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Re-enable background scrolling
        }
    });

    // Scroll event listener to show feature section after scrolling once
    window.addEventListener('scroll', function () {
        if (!hasScrolled) {
            featureSection.classList.add('visible');
            hasScrolled = true;
        }
    });
});
