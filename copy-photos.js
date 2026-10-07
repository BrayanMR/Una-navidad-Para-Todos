const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'image', 'NiñosRecibiendoRegalos');
const dstDir = path.join(__dirname, 'public', 'images', 'ninos');

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const list = [];
let idx = 1;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    const targetName = `nino-${idx}${ext}`;
    const srcPath = path.join(srcDir, file);
    const dstPath = path.join(dstDir, targetName);
    fs.copyFileSync(srcPath, dstPath);
    list.push(`images/ninos/${targetName}`);
    idx++;
  }
}

fs.writeFileSync(path.join(dstDir, 'list.json'), JSON.stringify(list, null, 2), 'utf8');
console.log(`Copied ${list.length} photos successfully!`);
