//Skapar en referens till inputfältet och button
const spaceName = document.querySelector('#spaceName');
const sendBtn = document.querySelector('#sendBtn');

//Skapar en referens till p-tagen 
const resultInput = document.querySelector('#resultElement');
const inputValue = spaceName.value;

//API nyckel & bildlänk
const apiKey = 'juyt1mHOZhfdGrROtkS3LHBsTxDp6rzHISBKRKh7';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&sol=1000`;



//För att hämta data använder vi fetch
//Första then gör om response tll json
//Andra then är vad vi ska göra med datan
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        //Curositydata är arrayen som innehåller foton
        const curiosityData = data.photos

        //För att få kortet till containern skapar en referens till containern där card ska ligga i HTML -
        const cardContainer = document.querySelector('#curiosity');

        //Om denna blir sant så finns det data
        if (curiosityData.length !== 0) {

            //variabel som begränsar datan från 0 till 4
            const limitedData = curiosityData.slice(0, 4);

            limitedData.forEach(element => {
                //Anropar på funktionen createCard, som skapar upp ett nytt kort, vi gör funktionen längre ner
                //För att skicka data till en funktion gör man det i parantesen element, vi lägger denna senare i en variabelfrån return createCard(element)
                const newCard = createCard(element)
                //För att lägga till nya card i container
                cardContainer.append(newCard);
            });


        } else {
            // Skapa ett nytt h3-element för att visa meddelandet
            const noDataMessage = document.createElement('h3');
            noDataMessage.textContent = 'No data was found, please try agian';
            // Lägg till meddelandet i containern
            cardContainer.append(noDataMessage);
        }
        //Fångar om det blir fel 
    }).catch(error => console.log(`Detta är felet: ${error}`));





//Gör en variabel som ska kunna ta emot data efter som vi skickar anrop
function createCard(element) {
    console.log('CreateCard körs');
    //Skapar alla HTML element

    const article = document.createElement('article');
    //Lägga till klass på article med namnet nasa-card
    article.classList.add('nasa-card');
    const title = document.createElement('h3');
    const imgDiv = document.createElement('div');
    //Lägga till klass på div med namnet nasa-img
    imgDiv.classList.add('nasa-img');
    const img = document.createElement('img');
    const dateInfo = document.createElement('p');


    //för att lägga till datan från nasa i title och dateinfo och i img
    title.textContent = element.rover.name;
    dateInfo.textContent = element.earth_date;
    img.src = element.img_src;


    //lägger img i img div
    imgDiv.append(img);
    //lägger till element i article
    article.append(title, imgDiv, dateInfo);
    imgDiv.append(img);

    console.log(article);
    return article;
}


//DARKMODE
const switchBtn = document.querySelector('#switchBtn');
//Skapar en referens till body
const bodyRef = document.querySelector('body');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';


//Lyssnare som lyssnar efter när användaren trycker upp en tangent
spaceName.addEventListener('keyup', () => {
    //Spara "hämta längden på värdet i input i en variabel"
    let getValueLength = spaceName.value.length;
    //Kontrollera så att användaren skrivit mer än 3 tecken
    //Villkoret get value större än 3 då händer if annars else
    if (getValueLength > 3) {
        //btn ska bli enabled
        sendBtn.disabled = false;
    } else {
        console.log('mindre');
        //Btn ska bli disabled
        sendBtn.disabled = true;

    }
});

//Lyssnar efter när input är i focus 
spaceName.addEventListener('focus', () => {
    //Lägger till klassen focus, som finns i style
    spaceName.classList.toggle('focusBorder')
});

//Lyssnar efter när input är i blur
spaceName.addEventListener('blur', () => {
    //Adderar classen focus
    spaceName.classList.toggle('focusBorder')


});

//Lyssnare som lyssnar efter klick på btn
sendBtn.addEventListener('click', (event) => {
    //Avbryter btns default beteende, den skickar inte formuläret
    event.preventDefault();
    //Sparar värdet av det som skrivs i inputrutan
    const inputValue = spaceName.value;
    //lägger text + värdet som skrivs 
    resultInput.textContent = "Welcome " + inputValue + " to NASA!";
    spaceName.value = '';
    //Kontrollerar om spaceName fältet är tomt och sätt btn till disabled
    if (spaceName.value === '') {
        //Om det är tomt
        console.log('tomt');
        //BTN ska bli disabled
        sendBtn.disabled = true;
    }

});


//Kontrollera om det finns något i localStorage
if (localStorage.getItem(darkModeKey) === darkModeValue) {
    //vi anropar enabled darkmode
    enabledDarkmode();

}

//BUTTON
switchBtn.addEventListener('click', () => {
    //Anropar funktionen toogleDarkMode
    toggleDarkMode();

});

//Funktion till Darkmode knapp
function toggleDarkMode() {
    //Kontrollera om body har klassen dark, 
    if (bodyRef.classList.contains('dark')) {
        //Om klassen dark finns - ta bort klassen dark, refererar till funktionen
        disabledDarkmode();
    } else {
        console.log('klassen dark finns INTE');
        //Om klassen inte finns - så vill vi lägga till klassen, referarar till fuktionen
        enabledDarkmode();
    }

}

//Funktion för att lägga till klassen
function enabledDarkmode() {
    switchBtn.checked = true;
    //lägga till dark på body
    bodyRef.classList.add('dark');
    //sätta localstorage, kan heta vad som helst
    setLocalStorage();
}

//Funktion för att ta bort dark mode
function disabledDarkmode() {
    bodyRef.classList.remove('dark');
    //funktion för at ta bort localStorage
    removeLocalStorage();



}

//Funktion för att sätta localStorage
function setLocalStorage() {
    //Sätter loalStorage med en key och value, se konstanter högst upp 
    //Ska kunna se i application att det står theme dark
    localStorage.setItem(darkModeKey, darkModeValue);


}

//Funktion för att ta bort localStorage
function removeLocalStorage() {
    console.log('removeLocalStorage körs');
    //Ta bort satt localStorage
    localStorage.removeItem(darkModeKey);
}




