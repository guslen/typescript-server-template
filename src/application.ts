import { helloWorld } from "src/lib/hello";

export function runApplication() {
  Promise.all([helloWorld()])
    .then(() => {
      console.log("finished execution successfully");
    })
    .catch((error) => {
      console.error("\napplication crashed with Error:\n", error);
      throw new Error("application error occurred");
    });
}
