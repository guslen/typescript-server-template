import { helloWorld } from "src/lib/hello";

export async function runApplication() {
  return helloWorld()
    .then(() => {
      console.info("finished execution successfully");
    })
    .catch((error) => {
      console.error("\napplication crashed with Error:\n", error);
      process.exit(1);
    });
}
