# Vite Plugin Webp And Path

## Description

This Vite plugin converts images to WebP format and updates their paths in HTML and CSS files.

## Installation

```bash
npm install vite-plugin-webp-and-path
```

## Usage

In your vite.config.js:

```
import VitePluginWebpAndPath from 'vite-plugin-webp-and-path';

export default {
  plugins: [
    VitePluginWebpAndPath({
      // options
    }),
  ],
};
```

## Options

- `targetDir`: Target directory to search for image files. Default is `./dist/`.
- `imgExtensions`: Comma-separated list of image file extensions to convert. Default is `jpg,png`.
- `textExtensions`: Comma-separated list of text file extensions to update image paths in. Default is `html,css`.
- `quality`: Quality of the converted WebP images. Default is 80.
- `enableLogs`: Enable logs. Default is true.

## License
MIT