import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { spawn } from "bun";

// CONFIG //
const SOURCE_IMAGE = "./source.png";
const OUTPUT_DIR = "./output.iconset";
const OUTPUT_ICNS_FILE = "./output.icns";
const TARGET_SIZES = [16, 32, 128, 256, 512];
const MULTIPLIERS = [1, 2];

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR);
}

async function createIconset() {
  for (const size of TARGET_SIZES) {
    for (const multiplier of MULTIPLIERS) {
      const realSize = size * multiplier;
      const suffix = multiplier === 1 ? "" : "@2x";
      const filename = `icon_${size}x${size}${suffix}.png`;
      const outputPath = `${OUTPUT_DIR}/${filename}`;
      await sharp(SOURCE_IMAGE).resize(realSize, realSize).toFile(outputPath);
      console.log(`Created: ${outputPath}`);
    }
  }

  // Convert iconset to .icns using iconutil
  const proc = spawn([
    "iconutil",
    "--convert",
    "icns",
    OUTPUT_DIR,
    "--output",
    OUTPUT_ICNS_FILE,
  ]);
  const exitCode = await proc.exited;
  const stdout = proc.stdout ? await Bun.readableStreamToText(proc.stdout) : "";
  const stderr = proc.stderr ? await Bun.readableStreamToText(proc.stderr) : "";
  if (exitCode === 0) {
    console.log(`Successfully created: ${OUTPUT_ICNS_FILE}`);
    if (stdout) console.log(stdout);
  } else {
    console.error(`iconutil failed:`, stderr);
  }
}

createIconset().catch(console.error);
