import { runApplication } from "src/application";

describe("application.ts", () => {
  jest.setTimeout(2000);
  it("should run main application", async () => {
    await runApplication();
  });
});
