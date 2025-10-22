const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const tempFile = path.join(__dirname, 'temp.json');
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
    console.log('temp.json deleted after test run');
  } else {
    console.log('No temp.json found to delete');
  }
};