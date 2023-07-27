import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  readFileSync,
  writeFileSync,
  appendFileSync,
  writeFile,
  readFile,
  appendFile,
} from "node:fs";

import fsPromise from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const notesPath = path.join(__dirname, "notes.txt");

writeFileSync(notesPath, "Hello from G12!", { encoding: "utf-8" });

const notesData = readFileSync(notesPath, { encoding: "utf-8" });

appendFileSync(
  notesPath,
  " And hello from the trainer and the students!",
  "utf-8"
);

console.log(notesData);

const handleNotes = async () => {
  try {
    const notesData = await fsPromise.readFile(notesPath, "utf-8");
    console.log("first read", notesData);

    await fsPromise.writeFile(notesPath, "From the promises function", "utf-8");

    await fsPromise.appendFile(
      notesPath,
      " , and i've been updated from promise function",
      "utf-8"
    );

    const finalNotesData = await fsPromise.readFile(notesPath, "utf-8");

    console.log("final read", finalNotesData);
  } catch (error) {
    console.error("Something went terribly wrong", error);
  }
};

handleNotes();
