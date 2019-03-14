var request = require("request");

function displayAreaData(data) {
    if (Array.isArray(data)) {
        console.log('Got an array:', data.length);
    }
    let counter = 0;
    for (let element of data) {

        // if (Object.keys(element).indexOf('OmrKode') > 0 ) {
        //     console.log(Object.values(element));
        // } 

        for (let e in element) {
            if ((e === 'OmrKode') || (e === 'Navn')) {
                // console.log('CHECK FOUND');
                console.log(e, element[e]);
            }
        }
        counter++;
    }
    console.log(counter);
}


function displayRodBla(data) {
    if (Array.isArray(data)) {
        console.log(`Got an array: ${data.length}`);
    }
    console.log(`Blå mandater: ${data[0].Mandater}`)  // blå
    console.log(`Røde mandater: ${data[1].Mandater}`)
}

// http://valg:8000/valg/api/Geografi/Get?valg=FV2015&omrtype=K    // get areas
// http://valg:8000/valg/api/Regeringskonstellation/Get/0?valg=FV2015&omrtype=L&omrkode=1&resultattype=R&resultatnr=1    // get rød/blå

request.get('http://valg:8000/valg/api/Regeringskonstellation/Get/0?valg=FV2015&omrtype=L&omrkode=1&resultattype=R&resultatnr=1',
    { json: { key: 'value' } },
    function (err, response, body) {
        if (!err && response.statusCode == 200) {
            // console.log(body)
            displayRodBla(body.Data)
        }
        else {
            console.log("no response");
        }
    });

request.get('http://valg:8000/valg/api/Geografi/Get?valg=FV2015&omrtype=K',
    { json: { key: 'value' } },
    function (err, response, body) {
        if (!err && response.statusCode == 200) {
            // console.log(body)
            displayAreaData(body.Data);
        }
        else {
            console.log("no response");
        }
    });