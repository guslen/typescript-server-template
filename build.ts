import * as esbuild from "esbuild";
import type { BuildOptions } from "esbuild";

const buildEnvOptionKey = "--buildEnv";
const buildEnvironments = ["production", "development"] as const;
type BuildEnvironment = typeof buildEnvironments[number];

const developmentOptions: BuildOptions = {
  outfile: "index.debug.js",
  minify: false,
  logLevel: "debug",
};

const productionOptions: BuildOptions = {
  outfile: "index.js",
  minify: true,
  logLevel: "info",
};

function isBuildEnvironment(
  unknownObject: unknown
): unknownObject is BuildEnvironment {
  return (
    typeof unknownObject === "string" &&
    buildEnvironments.findIndex((item) => item === unknownObject) >= 0
  );
}

function buildApp(additionalOptions: BuildOptions) {
  return esbuild
    .build({
      ...{
        logLevel: "info",
        entryPoints: ["src/index.ts"],
        bundle: true,
        sourcemap: true,
        platform: "node",
        target: "node18",
      },
      ...additionalOptions,
    })
    .catch((error) => {
      console.error(error);
      return process.exit(1);
    });
}

(async () => {
  const buildEnvOptionIndex = process.argv.findIndex(
    (item) => item === buildEnvOptionKey
  );
  if (buildEnvOptionIndex < 0) {
    throw new Error(`option ${buildEnvOptionKey} missing`);
  }
  const buildEnv = process.argv[buildEnvOptionIndex + 1];
  if (!isBuildEnvironment(buildEnv)) {
    throw new Error("not a valid build environment");
  }
  switch (buildEnv) {
    case "development":
      return buildApp(developmentOptions);
    case "production":
      return buildApp(productionOptions);
  }
})();
