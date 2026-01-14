
import figlet from "figlet";

async function doStuff() {
  const text = await figlet.text("Hello World!!");
  console.log(text);
}

async function main() {
    doStuff();
    console.log('Hello, World!');
}

main();