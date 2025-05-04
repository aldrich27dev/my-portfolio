const fs = require('fs');
const path = require('path');

const directoryPath = './dist'; // Adjust this to your build output folder

function updateAssetPaths(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log('Error reading file stats:', err);
          return;
        }

        if (stats.isDirectory()) {
          updateAssetPaths(filePath); // Recursively go into subdirectories
        } else if (stats.isFile()) {
          let fileContent = fs.readFileSync(filePath, 'utf-8');

          // Update asset paths to include the base path
          fileContent = fileContent.replace(/\/(?!\/)/g, '/my-portfolio/');

          fs.writeFileSync(filePath, fileContent, 'utf-8');
        }
      });
    });
  });
}

// Start processing from the dist folder
updateAssetPaths(directoryPath);
console.log('Asset paths updated successfully!');
