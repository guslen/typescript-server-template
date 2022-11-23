import { helloWorld } from "src/lib/hello";

describe("hello.ts", () => {
  it('should return "Hello World!"', async function () {
    expect(await helloWorld()).toBe("Hello world!");
  });
});
