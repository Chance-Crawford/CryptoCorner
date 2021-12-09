


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
// http request or function within the block to return before the
// code moves on to the next line.
async function parseCountries(dataObj){

    // arrays to hold the full named countries and
    // the array of probability.
    var countryList = [];
    var probableList = [];
    
    // loop through each country 2 digit abbreviation
    // and parse it to its full name.
    for(var i = 0; i < dataObj.country.length; i++){

        // gets the probability of the person being from each country
        // rounds it to nearest tenth then moves the period
        // to convert it to a percentage instead of decimal.

        // this probability code runs somewhat async to the code
        // within the fetch request below. This is alright
        // because the countries and probability still stay in order.
        var prob = dataObj.country[i].probability.toFixed(3).split(".")[1];
        prob = prob.slice(0, 2) + "." + prob.slice(2);

        // if first number in string is 0, remove first number
        if(prob[0] === "0"){
            prob = prob.slice(1)
        }
        console.log(prob);

        // push current country's probability to array
        probableList.push(prob);

        // we are forcing the for loop to pause and await
        // the http request to return. If we didnt do this,
        // some of the countries could display out of order.
        // because the for loop would continue on to the
        // next index in the array
        await fetch("http://api.worldbank.org/v2/country/" + dataObj.country[i].country_id + "?format=json").then( (response) => {
            
        // everything in here runs first
        // before it moves on to the next for loop fetch
        // request
            if(response.ok){
                response.json().then( (data) => {
                    console.log(data);                  
                    console.log(data[1][0].name);

                    countryList.push(data[1][0].name);

                    console.log(countryList.length);
                    console.log(countryList);

                    // inside request we are checking to see if
                    // this country request is the last one.
                    // if so, that means we got all the info we need.
                    // we then push both of the arrays to the function
                    // that displays the values to the page.
                    if(countryList.length === dataObj.country.length){
                        displayCountries(countryList, probableList);
                    }
                });
            }
            else{
                alert("error for parsing country to full name");
            }
        
        });
    }

    // DO NOT put anything outside of for loop because it will
    // mess up the flow. Any functions outside
    // should be ones you are alright with running
    // asynchronously, they will run the other functions
    // outside before the for loop is done
}




// Display countries in order to screen
// gives arrays of country names and their probability of being 
// from that country. lists correspond to eachother.
// so countryList[0] has the probability of probableList[0]
function displayCountries(countryList, probableList){
    console.log("Final list is:");
    console.log(countryList);
    console.log(probableList);
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
getAgePrediction("joshua");