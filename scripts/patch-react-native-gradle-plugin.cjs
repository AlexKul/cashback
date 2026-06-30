const fs = require("fs");
const path = require("path");

const settingsPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@react-native",
  "gradle-plugin",
  "settings.gradle.kts",
);

const oldResolver = 'id("org.gradle.toolchains.foojay-resolver-convention").version("0.5.0")';
const patchedResolver = 'id("org.gradle.toolchains.foojay-resolver-convention").version("1.0.0")';

if (!fs.existsSync(settingsPath)) {
  console.warn("[postinstall] React Native Gradle plugin settings file was not found; skipping patch.");
  process.exit(0);
}

const source = fs.readFileSync(settingsPath, "utf8");

if (source.includes(patchedResolver)) {
  process.exit(0);
}

if (!source.includes(oldResolver)) {
  throw new Error(
    "React Native Gradle plugin Foojay resolver patch failed: expected resolver version was not found.",
  );
}

fs.writeFileSync(settingsPath, source.replace(oldResolver, patchedResolver));
console.log("[postinstall] Patched React Native Gradle plugin Foojay resolver to 1.0.0.");
