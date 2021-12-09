


function getAgePrediction(name){
    fetch("https://api.agify.io?name=" + name.toLowerCase().trim()).then( (response) => {
        
        if(response.ok){
            response.json().then( (data) => {
                console.log(data);
                if(data.age){
                    getPredictedGender(name.toLowerCase().trim());
                }
                else{
                    console.log("No data given for age");
                    getPredictedGender(name.toLowerCase().trim());
                }
                
            });
        }
        else{
            alert("error for getting age");
        }
        
    });


}

function getPredictedGender(name){
    fetch("https://api.genderize.io?name=" + name).then( (response) => {
        
        if(response.ok){
            response.json().then( (data) => {
                console.log(data);
                if(data.gender){
                    getPredictedNationality(name);
                }
                else{
                    console.log("No data given for gender");
                    getPredictedNationality(name);
                }
                
                
            });
        }
        else{
            alert("error for getting gender");
        }
        
    });
}

function getPredictedNationality(name){
    fetch("https://api.nationalize.io?name=" + name).then( (response) => {
        
        if(response.ok){
            response.json().then( (data) => {
                console.log(data);

                if(data.country.length > 0){
                    parseCountries(data);
                    dog();
                }
                else{
                    console.log("No data given for countries");
                }

            });
        }
        else{
            alert("error for getting nationality countries");
        }
        
    });
}


// an async method allows you to wait for a specific async
// request or function within the block to return before the
// code moves on to next line.
async function parseCountries(dataObj){

    var countryList = [];
    
    // loop through each country 2 digit abbreviation
    // and parse it to its full name.
    for(var i = 0; i < dataObj.country.length; i++){
        // we are forcing the for loop to pause and await
        // the http request to return. If we didnt do this,
        // some of the countries could display out of order.
        // because to for loop would continue on to the
        // next index in the array
        
        await fetch("http://api.worldbank.org/v2/country/" + dataObj.country[i].country_id + "?format=json").then( (response) => {
            
            if(response.ok){
                response.json().then( (data) => {
                    console.log(data);                  
                    console.log(data[1][0].name);
                    countryList.push(data[1][0].name);
                    console.log(countryList.length);
                    console.log(countryList);
                    if(countryList.length === dataObj.country.length){
                        displayCountries(countryList);
                    }
                });
            }
            else{
                alert("error for parsing country to full name");
            }
        
        });
    }

    // DO NOT put anything outside of for loop because it will
    // mess up the flow and will run the other functions
    // outside before the for loop is done
}




// Display countries in order to screen
function displayCountries(countryList){
    console.log("Final list is:");
    console.log(countryList);
}


function dog(){
    fetch("https://dog.ceo/api/breeds/image/random").then( (response) => {
        if(response.ok){
            response.json().then( (data) => {
                console.log(data);
                dogImage(data);
            });
        }
        else{
            alert("error for getting dog image");
        }
        
    });
}


function dogImage(pic){
    var divEl = document.querySelector("#wow");

    var image = document.createElement("img");
    image.setAttribute("src", pic.message);
    image.style = "width: 75%;";

    divEl.appendChild(image);
}

// events
getAgePrediction("martin");