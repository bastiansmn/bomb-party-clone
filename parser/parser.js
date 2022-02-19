const fs = require("fs");

let readableStream = fs.createReadStream(process.argv[2], {
  encoding: "utf-16le",
});
let chunk;
const res = new Set();
readableStream.on("readable", () => {
  while ((chunk = readableStream.read()) !== null) {
    chunk
      .split("\n")
      .map(
        (line) =>
          line.split(",")[0].split(" ")[0].toLowerCase().replaceAll("\\", "")
        // .replaceAll(/\00/g, "")
      )
      .forEach((word) =>
        res.add(word.normalize("NFD").replace(/\p{Diacritic}/gu, ""))
      );
  }
});

readableStream.on("end", () => {
  const name = process.argv[3] ?? "output.txt";
  const str = Array.from(res).join("\n");
  fs.writeFile(name, str, "utf-16le", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  sortWordBySyllabes();
});

const syllabes = [
  "ai",
  "an",
  "ar",
  "au",
  "ce",
  "ch",
  "co",
  "de",
  "em",
  "en",
  "er",
  "es",
  "et",
  "eu",
  "ie",
  "il",
  "in",
  "is",
  "it",
  "la",
  "le",
  "ma",
  "me",
  "ne",
  "ns",
  "nt",
  "on",
  "ou",
  "pa",
  "qu",
  "ra",
  "re",
  "se",
  "te",
  "ti",
  "tr",
  "ue",
  "un",
  "ur",
  "us",
  "ve",
  "le",
  "en",
  "es",
  "de",
  "re",
  "ai",
  "ou",
  "nt",
  "on",
  "er",
  "ur",
  "an",
  "it",
  "te",
  "et",
  "me",
  "la",
  "is",
  "qu",
  "se",
  "il",
  "ue",
  "us",
  "eu",
  "co",
  "ra",
  "ne",
  "in",
  "ve",
  "pa",
  "ma",
  "au",
  "ar",
  "ns",
  "ch",
  "ie",
  "ti",
  "tr",
  "ce",
  "em",
  "un",
  " ain",
  "ais",
  "ait",
  "ans",
  "ant",
  "ati",
  "ava",
  "ave",
  "cha",
  "che",
  "com",
  "con",
  "dan",
  "des",
  "ell",
  "eme",
  "ent",
  "est",
  "éta",
  "eur",
  "eux",
  "fai",
  "ien",
  "ion",
  "ire",
  "les",
  "lle",
  "lus",
  "mai",
  "men",
  "mme",
  "nte",
  "omm",
  "ont",
  "our",
  "ous",
  "out",
  "ouv",
  "par",
  "pas",
  "plu",
  "pou",
  "que",
  "res",
  "son",
  "sur",
  "tai",
  "tio",
  "tou",
  "tre",
  "une",
  "ure",
  "ver",
  "vou",
  "ent",
  "que",
  "ait",
  "les",
  "lle",
  "our",
  "men",
  "ais",
  "est",
  "tre",
  "mai",
  "ous",
  "par",
  "ant",
  "ion",
  "eme",
  "tai",
  "ans",
  "pas",
  "ell",
  "vou",
  "tou",
  "pou",
  "eur",
  "ont",
  "res",
  "dan",
  "une",
  "éta",
  "ien",
  "sur",
  "son",
  "mme",
  "tio",
  "des",
  "ire",
  "com",
  "omm",
  "ver",
  "con",
  "che",
  "ave",
  "ain",
  "ure",
  "out",
  "plu",
  "cha",
  "eux",
  "ava",
  "ouv",
  "nte",
  "lus",
  "fai",
  "ati",
];
function sortWordBySyllabes() {
  const results = {};
  syllabes.forEach(
    (syl) =>
      (results[syl] = Array.from(res).filter((word) =>
        word.includes(syl.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())
      )).sort((a, b) => a.localeCompare(b))
  )
  writeJsonDict(results);
}

function writeJsonDict(data) {
  const name = "output.json";
  fs.writeFile(name, JSON.stringify(data), "utf-16le", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log("finish");
}