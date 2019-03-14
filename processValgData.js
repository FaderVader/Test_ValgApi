const valgData = require('./valgData.json');
const request = require('request-promise-native');

// version using a local file:
// const allKredse = valgData.Data;

// allKredse.forEach(element => {
//     console.log(element.Navn);
// });

// version getting livedata from ValgAPI
// getDataObject();
async function getDataObject() {
    const data = await request.get('http://valg04udv:8000/valg/api/Geografi/Get?valg=FV2018&omrtype=K');
    const jsonData = JSON.parse(data);
    const allKredse = jsonData.Data;

    let body = {};
    body.results = [];
    let index = 1;

    allKredse.forEach(kreds => {
        console.log(`omr:${kreds.OmrKode}  Navn:${kreds.Navn}`);
        let area = {
            "OmrKode": kreds.OmrKode,
            "OmrType": "D",
            "ResultatType": "R",
            "Valg": "fv2018",
            "ResultGuid": `000-0${index}`,
            "Konstellationer": "4,10"
        }
        body.results.push(area);

        console.log(area);
        index++;
    });    

    console.log(body);
}


getDataString();
async function getDataString() {
    const data = await request.get('http://valg04udv:8000/valg/api/Geografi/Get?valg=FV2018&omrtype=K');
    const jsonData = JSON.parse(data);
    const allKredse = jsonData.Data;


    let index = 1;
    const header = `{"results": [`
    const footer = `]}`;
    let query = "";

    allKredse.forEach(kreds => {
        let area = `
        {
            "OmrKode": ${kreds.OmrKode}, 
            "OmrType": "K",
            "ResultatType": "R",
            "Valg": "fv2018",
            "ResultGuid": "000-0${index}",
            "Konstellationer": "4,10"
        },
        `

        // console.log(area);
        query = query + area;
        index++;
    });        

    const lastcomma = query.lastIndexOf(',');
    const truncQuery = query.substring(0, lastcomma);
    const output = header + truncQuery + footer;  //, query.length-10
    console.log(output);
}