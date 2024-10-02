

//      Randomly divide heroes array into two seperate arrays
export const randomlySplitHeroesArray = (heroes, galleryImages, backupImages) =>
    {
        let randomImageIndex: number;
        let randomImageCounter: number = heroes.length;

        for(let i = 0; i < 10 ; i++)
            {
                randomImageIndex = Math.floor(Math.random() * (randomImageCounter));
                galleryImages.push(heroes[randomImageIndex]);
                heroes.splice(randomImageIndex,1);
                
                randomImageCounter--;
            }
                    
            for (let i = 0; i < heroes.length; i++) {
                backupImages.push(heroes[i]);
            }

    }


//      Assign randlomly chosen images to corkboard
export const assignRandomImage = (galleryImages) =>
        {
            const imageContainer = document.querySelectorAll(".photo img");
            const imageDescription = document.querySelectorAll(".description");
    
            imageContainer.forEach((el, i) => {
                el.src = galleryImages[i].imgPath;
                el.classList.add("unhighlight-image");
            });
    
            imageDescription.forEach((el, i) => {
                el.innerHTML = galleryImages[i].heroName;
            });
            
            imageContainer.forEach((el, i) => {
                el.id = galleryImages[i].id;
            });
        }


//      Add starting class to all buttons
export const assignStartingButtonsClass = (buttonsColection) =>{
        buttonsColection.forEach((el) => {
            el.classList.add("unactive");
        });
        }



//      Render list of reserve heroes in side menu
export const renderReserveListOfHeros = (backupImages) => {

            const heroList = document.querySelector(".hero-list");
        
            for (let i = 0 ; i < backupImages.length ; i++)
                {
                    const singleHeroContainer = document.createElement("div");
                    singleHeroContainer.classList.add("single-hero-container");
                    const imgMiniature = document.createElement("img");
                    imgMiniature.src = backupImages[i].imgPath;
                    imgMiniature.id = backupImages[i].id;
                    const heroDescription = document.createElement("div");
                    heroDescription.innerHTML = backupImages[i].heroName;
                    heroDescription.classList.add("hero-name");
        
                    heroList.appendChild(singleHeroContainer);
                    singleHeroContainer.appendChild(imgMiniature);
                    singleHeroContainer.appendChild(heroDescription);
        
                   
                }
        
        };