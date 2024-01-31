// read all csv files in this folder and merge them into one csv file

const fs = require("fs");

const files = fs.readdirSync("./").filter((file) => file.endsWith(".csv"));

const lines = Array.from({ length: 21 }, () => "");

for (const file of files) {
    const fileContent = fs.readFileSync(file);
    const fileLines = fileContent.toString().split("\n");

    for (let i = 0; i < 21; i++) {
        lines[i] += `${fileLines[i]};`;
    }
}

fs.writeFileSync("merged.csv", lines.join("\n"));
console.log(lines);
