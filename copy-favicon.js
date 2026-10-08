const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'src', 'image', 'favicon', 'estrella-de-navidad.png');
const destPng = path.join(__dirname, 'public', 'favicon.png');
const destIco = path.join(__dirname, 'public', 'favicon.ico');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, destPng);
  fs.copyFileSync(src, destIco);
  console.log('Favicon copiado con éxito a public/favicon.png y public/favicon.ico');
} else {
  console.error('No se encontró el archivo origen:', src);
}
