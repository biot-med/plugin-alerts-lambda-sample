import * as fs from 'fs';
import { handler } from '../index.js'


const readJson = () => { // TODO: ORI - THIS
   const json = fs.readFile("./events/eventTestSimple.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      console.log("File data:", jsonString);
      return jsonString;
    });      
    return json;
}


export const test = async () => {
    console.log("Test started")
    const lambdaReturn = await handler(readJson());  // TODO: ORI - THIS
}

test();
