const fs = require("fs");

// let lines = [];
// fs.readFile(process.argv[2], 'utf8' , (err, data) => {
//    if (err) {
//       console.error(err)
//       return
//    }
//    lines = data.split('\n')
//       .map(line => line.split(",")[0].split(" ")[0])
// });

let readableStream = fs.createReadStream(process.argv[2], {
  encoding: "ascii",
});
let chunk;
const res = new Set();
readableStream.on("readable", () => {
  while ((chunk = readableStream.read()) !== null) {
    chunk
      .split("\n")
      .map((line) =>
        line
          .split(",")[0]
          .split(" ")[0]
          .toLowerCase()
          .replaceAll("\\", "")
          .replaceAll(/\00/g, "")
      )
      .forEach((word) => res.add(word));
  }
});

readableStream.on("end", () => {
  const name = process.argv[3] ?? "output.txt";
  const str = Array.from(res).join("\n");
  fs.writeFile(name, str, "ascii", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log("finish");
});
