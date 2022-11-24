import { helloWorld } from "src/lib/hello";

export function runApplication() {
  Promise.all([helloWorld()])
    .then(() => {
      console.info("finished execution successfully");
    })
    .catch((error) => {
      console.error("\napplication crashed with Error:\n", error);
      process.exit(1);
    });
}
