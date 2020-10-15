const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 30;
const apiKey ='v-Dbv5TjsTHXOk_tmjNi8tg49gH-lapkohKTod1mMcM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if images where loaded
function imageLoaded() {
imagesLoaded++;
if (imagesLoaded === totalImages){
    ready = true;
    console.log('ready =', ready)
}
}
// helper function to set attributes on Dom Elelments
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// create links for photos and elements and add to dom
function displayPhotos(){
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // for each odject in array
    photosArray.forEach((photo) => {
        // create and anchor to connect to unsplash
        const item = document.createElement('a');
      
      setAttributes(item,{
          href:photo.links.html,
          target: 'blank',
      });
        // create img for photo
        const img = document.createElement('img');
      


        // put img inside anchor then put both inside the image container
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,  
        });

        //Event listener
      img.addEventListener('load', imageLoaded);


        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from unsplash 
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
    displayPhotos();
    } catch (error){
        // catch here
    }
}

// check to see if scrolling
window.addEventListener('scroll', () =>  {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
}
});

//Onload
getPhotos();


