import zip from "bestzip";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __basedir = path.join(__dirname, "../");
const __destinationDir = `${__basedir}/packed`;

const errorFunc = (msg) => (error) => {
  console.error("\x1b[31m", msg || "Error");
  if (error) throw error;
};

const createBundle = async () => {
  if (!fs.existsSync(__destinationDir)) {
    fs.mkdirSync(__destinationDir);
  }
  try {
    // const relativeBasePath = "..";
    await zip({
      source: [`index.js`, `src/*`, `package.json`, `node_modules/*`],
      destination: `./packed/packed.zip`,
      cwd: __basedir,
    });
    console.info("Zipped: /index.js, /src/*, /package.json, /node_modules/*");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createBundle();
