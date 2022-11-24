import { runApplication } from "src/application";

describe("application.ts", () => {
  it("should run main application", (done) => {
    runApplication();
    done();
  });
});
