// This is a helper script - you'll need to run it once
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Icons directory created at:', iconsDir);
console.log('Please generate icons using:');
console.log('1. https://www.pwabuilder.com/imageGenerator');
console.log('2. Upload a 512x512 logo');
console.log('3. Download all sizes');
console.log('4. Place them in public/icons/');