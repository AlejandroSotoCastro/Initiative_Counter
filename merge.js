const fs = require("fs");
const path = require("path");

let inputFiles;
let outputFile;

const scriptTemplate = (data) => `\n<script>\n${data}</script>`;
const styleTemplate = (data) => `\n<style>\n${data}</style>\n`;

const ReadAndMerge = function (inputFiles, outputFile) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }

  inputFiles.forEach(function (file, index) {
    // maintain sync
    setTimeout(() => {
      fs.readFile(file, (err, data) => {
        if (err) throw err;

        let updatedData = data;

        if (index == 1) updatedData = scriptTemplate(data);
        if (index === 2) updatedData = styleTemplate(data);

        fs.appendFile(outputFile, updatedData, function (err) {
          if (err) throw err;
        });
      });
    }, index * 100);
  });
};

const updateInOut = function () {
  //sanitize
  inputFiles = [path.join(__dirname, `./base.html`), path.join(__dirname, `./script.js`), path.join(__dirname, `./style.css`)];

  outputFile = path.join(__dirname, `./release/one-file-initiative-counter.html`);
};

// read and Merge
updateInOut();
ReadAndMerge(inputFiles, outputFile);
