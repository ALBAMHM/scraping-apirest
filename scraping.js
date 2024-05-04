const axios = require('axios');
const cheerio = require('cheerio')
const fs= require('fs')

const url = 'https://elpais.com/ultimas-noticias/';
const noticias = []


const scraping = axios.get(url).then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
                
                
            $('article').each((index, element) => {
                const link = $(element).find('a').attr('href');
                const img = $(element).find('img').attr('src');
                const description = $(element).find('.c_d').text();
                const pageTitle = $(element).find('.c_h').text();
                    
                const noticia = {
                    titulo: pageTitle ,
                    descripcion: description,
                    link: link,
                    imagen: img
                }
            noticias.push(noticia)
            })

            guardarDatos();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function guardarDatos() {
        fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
    }

module.exports = {scraping,guardarDatos};