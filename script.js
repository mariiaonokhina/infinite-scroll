$(document).ready(function(){

    const imageContainer = document.getElementById("imageContainer");

    const loader = document.getElementById("loader");

    let ready = false;

    let imagesLoaded = 0;

    let totalImages = [];

    // Creating an empty array for photos. It is going to contain a lot of nested variables
    let photosArray = [];

    // Unsplash API

    // Constant for imageCso that we can change the number more easily
    let imageCount = 5;

    const apiKey = 'rLOSuzMl9EpdSrlCil4bGMlAgIGPWWdMPSrBID6SBBc';

    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

    // Get photos from Unsplash API
    async function getPhotos() {

        try {

            // Function is going to wait for response from apiUrl
            const response = await fetch(apiUrl);

            photosArray = await response.json();

            displayPhotos();

        } catch (error) {

            // Catch error

        }

    }

    // Helper Function to set attributes on DOM elements
    function setAttributes(element, attributes) {

        for (const key in attributes) {

            element.setAttribute(key, attributes[key]);

        }

    }

    // Check if all images were loaded
    function imageLoaded() {

        imagesLoaded ++;

        if (imagesLoaded === totalImages) {

            ready = true;

            loader.hidden = true;

            imageCount = 30;

        }

    }

    // Display photos in index.html. Create elements for links & photos
    function displayPhotos() {

        imagesLoaded = 0;

        totalImages = photosArray.length;

        console.log("total images", totalImages);

        // Run function for each object (photo) in photosArray
        photosArray.forEach((photo) => {

            // Create <a> to link to Unsplash
            const item = document.createElement("a");

            setAttributes(item, {

                href: photo.links.html,

                // If photo is clicked, will open a new window that leads to Unsplash
                target: "_blank",

            });

            // Create <img> for photo008
            
            const img = document.createElement("img");

            setAttributes(img, {

                src: photo.urls.regular,

                alt: photo.alt_description,

                title: photo.alt_description,

            });

            // Event Listener,check when each is finished loading
            img.addEventListener("load", imageLoaded)
            // Put <img> inside <a>, then put both inside imageContainer
            item.appendChild(img);

            imageContainer.appendChild(item);

        });

    }

    // Check to see if scrolling near botton of page, Load more photos
    window.addEventListener("scroll", () => {

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {

            ready = false;

            getPhotos();

        }

    });

    // When page loads, run:
    getPhotos();
    
});