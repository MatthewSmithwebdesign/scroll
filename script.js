const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// unsplash api
const count = 10;
const apiKey ='v-Dbv5TjsTHXOk_tmjNi8tg49gH-lapkohKTod1mMcM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function to set attributes on Dom Elelments
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// create links for photos and elements and add to dom
function displayPhotos(){
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


//Onload
getPhotos();


