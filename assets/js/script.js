


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
                    for(var i = 0; i < data.country.length; i++){
                        parseCountries(data.country[i].country_id);
                    }
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



    



function parseCountries(abbreviation){

    fetch("http://api.worldbank.org/v2/country/" + abbreviation + "?format=json").then( (response) => {

        if(response.ok){
            response.json().then( (data) => {
                console.log(data);
                console.log(data[1][0].name);
            });
        }
        else{
            alert("error for parsing country to full name");
        }
        
    });
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
getAgePrediction("ray");