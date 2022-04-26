const { JSDOM } = require('jsdom')
const http = require('http');

let wynik=[]

function sort(){
    for(let i = 0; i < wynik.length; i++){
        for(let j = 0; j < wynik.length - i - 1; j++){
            if(wynik[j][3] > wynik[j+1][3]){
                let temp = wynik[j];
                wynik[j] = wynik[j+1];
                wynik[j+1] = temp;
            }
        }
    }
}

function buildHtml(req) {
  let header = '<title>Cena za stronę</title> <style>tr:nth-child(even) {background-color: #CCCCCC;} body{text-align:center}</style>';
  let body = '<table> <tr><th> Tytuł </th><th> Cena </th><th> Strony </th><th> Cena za stronę </th></tr>';

  for(let i = 0; i < wynik.length; i++){
      body += '<tr><td>' + wynik[i][0] + '</td><td>' + wynik[i][1] + '</td><td>' + wynik[i][2] + '</td><td>' + wynik[i][3] +'</td></tr>';
  }

  return '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</table></body></html>';
};

function buildRank(){
    console.log('Strona dziala na: localhost:8080')
    http.createServer(function (req, res) {
        let html = buildHtml(req);
      
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Length': html.length,
          'Expires': new Date().toUTCString()
        });
        res.end(html);
      }).listen(8080);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function readPage(site){
    const request = require('request')
    
    request(site, function(
        error1,
        response1,
        body1,
    ){
        const{ document } = new JSDOM(body1).window;
        let ceny = document.querySelector('#cena_d');
        if(parseFloat(ceny.innerHTML.slice(0, -3).replace(/,/,".")) < 0.5){
            ceny = document.querySelector('#cena_e');
        }
        const tytuly = document.querySelector('h1 span')
        const strony = document.querySelector('dd[itemprop="numberOfPages"]')

        // console.log(i, ceny.innerHTML)
        // console.log(tytuly.innerHTML)
        // console.log(strony.innerHTML)
        let pages = parseFloat(strony.innerHTML);
        let price = parseFloat(ceny.innerHTML.slice(0, -3).replace(/,/,"."));
        let unitPrice = price/pages;
        wynik.push([tytuly.innerHTML, price, pages ,roundToTwo(unitPrice)])
        if(wynik.length === 50){
            sort();
            buildRank();
        }
    })
}

function readPages(){
    let result = []
    const request = require('request')
    request('https://helion.pl/kategorie/bestsellery', function (
        error,
        response,
        body
    ) {
        const{ document } = new JSDOM(body).window;
        const lista = document.querySelectorAll('.bestseller-list-first li h2 a');

        for (let i = 0; i < lista.length; i++){      
            readPage('https:' + lista[i].getAttribute('href'), i)
        } 
    })
}

console.log("Zczytuje strony...")
readPages()

