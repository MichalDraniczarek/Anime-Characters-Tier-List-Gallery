import { heroes, galleryImages, backupImages, tempHero } from "./types/objects.js";
import {randomlySplitHeroesArray, assignRandomImage, assignStartingButtonsClass, renderReserveListOfHeros} from "./functions/onWindowLoadFn.js";
import {closePopupFn, showNextHero, showPreviousImg, assignImgToGallery, assignIndexOfClickedHero, createNewGalleryHeroesArr, swapheroPlacesFn, addHeroToSpareHeroList, addHeroToGallery, passHeroToTempObj, hideSidePanel, showSidePanel, highlightToggle, buttonActivationFn, restartButtonsActivation} from "./functions/commonFn.js";

//  VARIABLES
const initialRandomlyGeneratedRankImg = document.querySelectorAll(".photo img");
const buttonsColection = document.querySelectorAll("div.button-container button");

const addCharacterBtn: HTMLButtonElement = document.querySelector(".add-character");
const swapcharacterPlaceBtn: HTMLButtonElement = document.querySelector(".swap-places");
const showGalleryBtn: HTMLButtonElement = document.querySelector(".show-gallery");
const closeSidePanelIcon: HTMLElement  = document.querySelector(".close-hero-panel");
const closePopUp: HTMLElement  = document.querySelector(".popup-close");
const spareHeroContainer: HTMLElement  = document.querySelector(".add-hero-container");
const galleryContainer: HTMLElement  = document.querySelector(".show-my-gallery");
const leftGalleryArrowBtn: HTMLElement  = document.querySelector(".arrow-left");
const rightGalleryArrowBtn: HTMLElement  = document.querySelector(".arrow-right");

let currentHeroesInGalleryArr:number[] = [];

let indexedHero:number = 1;


let buttonsActivation: boolean = false;
let sidePanelVisibility: boolean = false;
let swapPlacesButtonStateActive: boolean = false;
let blockEventsWhileAddCharacterButttonIsActive = false;

//  INITIALIEZED FUNCTIONS ON WINDOW LOAD
randomlySplitHeroesArray(heroes, galleryImages, backupImages);
assignRandomImage(galleryImages);
assignStartingButtonsClass(buttonsColection);
renderReserveListOfHeros(backupImages);







//EVENTS


    //  Use keyboard arrows and escape key to switch gallery image and to close gallery
    document.addEventListener("keydown", (e) => {
        if (!galleryContainer.classList.contains("gallery-visibility")) {
            if (e.code === "ArrowRight" || e.keyCode === 39) {
                indexedHero = showNextHero(indexedHero, currentHeroesInGalleryArr);
            }

            if (e.code === "ArrowLeft" || e.keyCode === 37) {
                indexedHero = showPreviousImg(indexedHero, currentHeroesInGalleryArr);
            }

            if (e.code === "Escape" || e.keyCode === 27) {
                closePopupFn(galleryContainer);
            }
        }
    });


    //  Switch gallery image by pressing left arrow button
    leftGalleryArrowBtn.addEventListener("click", (e) =>{

        indexedHero = showPreviousImg(indexedHero, currentHeroesInGalleryArr);

    });

    //  Switch gallery image by pressing right arrow button
    rightGalleryArrowBtn.addEventListener("click", (e) =>{
        
        indexedHero = showNextHero(indexedHero, currentHeroesInGalleryArr);
    });

    // Close gallery by pressing " x " icon
    closePopUp.addEventListener("click", (e) =>{
        closePopupFn(galleryContainer);
    });

    // Open gallery by pressing show gallery icon on top of the page
    showGalleryBtn.addEventListener("click", (e) => {

        if(!blockEventsWhileAddCharacterButttonIsActive && !swapPlacesButtonStateActive && buttonsActivation)
        { 
            galleryContainer.classList.remove("gallery-visibility");
            currentHeroesInGalleryArr = createNewGalleryHeroesArr(e,currentHeroesInGalleryArr);
            indexedHero = assignIndexOfClickedHero(tempHero);
            
            assignImgToGallery(indexedHero);
        }
    });

    // Event that allows to switch places on heroes board
    initialRandomlyGeneratedRankImg.forEach((el) => {

        el.addEventListener("click", e =>{ 
            if(!blockEventsWhileAddCharacterButttonIsActive && !swapPlacesButtonStateActive)
                {
                    buttonsActivation = highlightToggle(e, initialRandomlyGeneratedRankImg, buttonsActivation, buttonsColection );
                    passHeroToTempObj(el, tempHero);
                }else if(!blockEventsWhileAddCharacterButttonIsActive && swapPlacesButtonStateActive){
                    swapheroPlacesFn(el, tempHero);

                    buttonsActivation = highlightToggle(e, initialRandomlyGeneratedRankImg, buttonsActivation, buttonsColection );
                    swapPlacesButtonStateActive =  false;
                }
        }); 
    });
    
    // Event that unhighlight checked hero image
    document.addEventListener('click', (e) => {

        if(!blockEventsWhileAddCharacterButttonIsActive || !swapPlacesButtonStateActive)
        {
            buttonsActivation = restartButtonsActivation(e, buttonsActivation, buttonsColection, initialRandomlyGeneratedRankImg);
        }
    });
    
    // Show side panel if action buttons are active
    addCharacterBtn.addEventListener("click", () => {
        
        if(buttonsActivation)
        {
            showSidePanel(buttonsActivation, sidePanelVisibility, buttonsColection);
            sidePanelVisibility = true;
            blockEventsWhileAddCharacterButttonIsActive = true;
        }
        
    });

    //  Close side panel contains spare heroes
    closeSidePanelIcon.addEventListener("click", () => {
        hideSidePanel();
        buttonsActivation = false;
        sidePanelVisibility = false;
        blockEventsWhileAddCharacterButttonIsActive = false;
    }); 


    // Move hero from side panel to corkboard
    spareHeroContainer.addEventListener("click", (e) =>{
    if(e.target.parentElement.classList.contains("single-hero-container"))
        {
            let el = e.target.parentElement;
            addHeroToGallery(el, tempHero);
            el.remove();
            addHeroToSpareHeroList(tempHero);
            hideSidePanel();
            buttonsActivation = false;
            sidePanelVisibility = false;
            blockEventsWhileAddCharacterButttonIsActive = false;
        }
    });

    //  Swap heros places function
    swapcharacterPlaceBtn.addEventListener("click", (e) => {

        if(buttonsActivation)
            {
                swapPlacesButtonStateActive = true;
                buttonsActivation = false;

                buttonActivationFn(buttonsActivation, buttonsColection);
            }
    });












