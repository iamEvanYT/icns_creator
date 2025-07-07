# ICNS Creator

A simple Bun script to generate `.icns` files from a source image for macOS applications. This script uses `sharp` for image resizing and Apple's `iconutil` command-line tool to create the final `.icns` file.

## Requirements

- [Bun](https://bun.sh/)
- macOS (the script relies on `iconutil`, which is available on macOS only)
- A source image file (e.g., `source.png`). A high-resolution square image (e.g., 1024x1024) is recommended for best results.

## Usage

1.  **Install dependencies:**

    ```sh
    bun install
    ```

2.  **Add your source image:**
    Place your source image in the root of the project and name it `source.png`, or update the `SOURCE_IMAGE` constant in `index.ts` to point to your image file.

3.  **Run the script:**

    ```sh
    bun run start
    ```

    The script will create an `output.iconset` directory with the resized images and then generate the `output.icns` file in the root directory.

## Configuration

You can customize the script's behavior by editing the constants at the top of the `index.ts` file:

- `SOURCE_IMAGE`: Path to your source image file.
- `OUTPUT_DIR`: The name of the temporary directory for the generated icon set.
- `OUTPUT_ICNS_FILE`: The name of the final `.icns` file.
- `TARGET_SIZES`: An array of base sizes (in pixels) to generate for the icon set.
- `MULTIPLIERS`: An array of multipliers (e.g., `1` for @1x, `2` for @2x Retina displays) to apply to the `TARGET_SIZES`.
