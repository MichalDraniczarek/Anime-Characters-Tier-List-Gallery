
//      highlight or unhighlight image depending on state
export const highlightToggle = (evt, initialRandomlyGeneratedRankImg, buttonsActivation, buttonsColection) => {

    if(evt.target.classList.contains("unhighlight-image")){
    initialRandomlyGeneratedRankImg.forEach((el) => {
        el.classList.remove("highlight-image");
        el.classList.add("unhighlight-image");      
    });

    evt.target.classList.remove("unhighlight-image");
    evt.target.classList.add("highlight-image");

    buttonsActivation = true;

    buttonActivationFn(buttonsActivation, buttonsColection);   
    }else if(evt.target.classList.contains("highlight-image")){
        evt.target.classList.remove("highlight-image");
        evt.target.classList.add("unhighlight-image");

        buttonsActivation = false;

        buttonActivationFn(buttonsActivation, buttonsColection);  

    }else {
        initialRandomlyGeneratedRankImg.forEach((el) => {
            el.classList.remove("highlight-image");
            el.classList.add("unhighlight-image");    
        });

        buttonsActivation = false;

        buttonActivationFn(buttonsActivation, buttonsColection);  
    }

    return buttonsActivation;
}

//      add or remove class "unactive" from actions buttons
export const buttonActivationFn = (buttonsActivation, buttonsColection) =>{

    if(buttonsActivation == true){
        buttonsColection.forEach((el) => {
            el.classList.remove("unactive");
        });
    }else if(buttonsActivation == false){
        buttonsColection.forEach((el) => {
            el.classList.add("unactive");
        });
    }

}

//       (unhighlight image and remove class "unactive") when user "click" on other objects
export const restartButtonsActivation = (e, buttonsActivation, buttonsColection, initialRandomlyGeneratedRankImg) =>{

        if(!(e.target.matches(".photo img") || e.target.matches("div.button-container button"))){
                       
            buttonsActivation = highlightToggle(e, initialRandomlyGeneratedRankImg, buttonsActivation, buttonsColection );
        }else {

        }
        return buttonsActivation;
    }

//      Dsiplay side panel containing hero list
export const showSidePanel = (buttonsActivation, sidePanelVisibility, buttonsColection) =>
        {
            const heroPanel = document.querySelector(".add-hero-container");
            if(buttonsActivation == true && sidePanelVisibility == false)
                {       
                    heroPanel.classList.remove("hide-side-panel");
                    heroPanel.classList.add("show-side-panel");
        
                    sidePanelVisibility = true;
                    buttonsActivation = false;

                    buttonActivationFn(buttonsActivation, buttonsColection);
                }                 
            }

//      hide side panel containing hero list
export const hideSidePanel  = () => {

    const heroPanel = document.querySelector(".add-hero-container");

    heroPanel.classList.remove("show-side-panel");
    heroPanel.classList.add("hide-side-panel");
}

//      Copy highlighted image and description to object createtd for that purpose
export const passHeroToTempObj = (el, tempHero) =>{  
    tempHero.imgPath = el.src;
    const galleryHeroName = el.nextElementSibling;
    tempHero.heroName = galleryHeroName.innerHTML;
    tempHero.id = el.id;   
}


//      Paste image and description from side panel to main gallery
export const addHeroToGallery = (el, tempHero) => {

    const photoToChangeCollection = document.querySelectorAll(".photo img");
    let elementIndex: number;

    photoToChangeCollection.forEach((el,index) => {
        if(el.id === tempHero.id )
            {
                elementIndex = index;
            }           
    });

    photoToChangeCollection[elementIndex].id = el.children[0].id;

    photoToChangeCollection[elementIndex].src = el.children[0].src;

    photoToChangeCollection[elementIndex].nextElementSibling.innerHTML = el.children[1].innerHTML;
}

// Create new slot for hero list in side panel and add it to this list
export const addHeroToSpareHeroList = (tempHero) =>{

    const heroList = document.querySelector(".hero-list");

    const singleHeroContainer = document.createElement("div");
    singleHeroContainer.classList.add("single-hero-container");
    const imgMiniature = document.createElement("img");
    imgMiniature.src = tempHero.imgPath;
    imgMiniature.id = tempHero.id;
    const heroDescription = document.createElement("div");
    heroDescription.innerHTML = tempHero.heroName;
    heroDescription.classList.add("hero-name");

    heroList.appendChild(singleHeroContainer);
    singleHeroContainer.appendChild(imgMiniature);
    singleHeroContainer.appendChild(heroDescription);
    
}

//  Swap heros places function
export const swapheroPlacesFn = (el, tempHero) =>{

    const photoToChangeCollection = document.querySelectorAll(".photo img");
    let elementIndex: number;

    photoToChangeCollection.forEach((el,index) => {
        if(el.id === tempHero.id )
            {
                elementIndex = index;
            }           
    });

    let tempID = el.id;
    let tempSrc = el.src;
    let tempName = el.nextElementSibling.innerHTML

    photoToChangeCollection[elementIndex].id = tempID;

    photoToChangeCollection[elementIndex].src = tempSrc;

    photoToChangeCollection[elementIndex].nextElementSibling.innerHTML = tempName;

    el.id = tempHero.id;
    el.src = tempHero.imgPath;
    el.nextElementSibling.innerHTML = tempHero.heroName;   
}




export const createNewGalleryHeroesArr = (e,currentHeroesInGalleryArr) =>{

    const allHeroesImages = document.querySelectorAll(".photo img");

    currentHeroesInGalleryArr = [];

    allHeroesImages.forEach((el) => {
        currentHeroesInGalleryArr.push(el.src);
    });

    return currentHeroesInGalleryArr;
}

export const assignIndexOfClickedHero = (tempHero) =>{

    const allHeroesImages = document.querySelectorAll(".photo img");

    let currentImage:number;

    allHeroesImages.forEach((el, index) => {
        if(el.id === tempHero.id )
            {
                currentImage = index;
            }   
    });

    return currentImage;
}


export const assignImgToGallery = (indexedHero) =>{
    
    const allGalleryPhotos = document.querySelectorAll(".photo img");
    const galleryCurrentImg = document.querySelector(".show-my-gallery img");
    galleryCurrentImg.src = allGalleryPhotos[indexedHero].src;
}




export const showPreviousImg = (indexedHero, currentHeroesInGalleryArr) =>{
    indexedHero--;
    if(indexedHero >= 0)
    {
        assignImgToGallery(indexedHero);
    }else if(indexedHero < 0){
        indexedHero = currentHeroesInGalleryArr.length -1;
        assignImgToGallery(indexedHero);
        
        }
    
    return indexedHero;
}



export const showNextHero = (indexedHero, currentHeroesInGalleryArr) =>{
    indexedHero++;
    if(indexedHero >= 0 && indexedHero <= currentHeroesInGalleryArr.length -1)
    {
        assignImgToGallery(indexedHero);
    }else if(indexedHero > currentHeroesInGalleryArr.length-1){
        indexedHero = 0;
        assignImgToGallery(indexedHero);
        
        }

        return indexedHero;
}





export const closePopupFn = (galleryContainer) =>{
    galleryContainer.classList.add("gallery-fade-out");
        
    setTimeout(() => {
        galleryContainer.classList.add("gallery-visibility");
        galleryContainer.classList.remove("gallery-fade-out");
    }, 300);

}
