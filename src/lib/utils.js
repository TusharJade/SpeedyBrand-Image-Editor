import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const effects = {
  grayscale: (ctx, width, height, offsetX, offsetY) => {
    const imageData = ctx.getImageData(offsetX, offsetY, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const brightness =
        data[i] * 0.34 + data[i + 1] * 0.5 + data[i + 2] * 0.16;
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }

    ctx.putImageData(imageData, offsetX, offsetY);
  },

  invert: (ctx, width, height, offsetX, offsetY) => {
    const imageData = ctx.getImageData(offsetX, offsetY, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imageData, offsetX, offsetY);
  },

  sepia: (ctx, width, height, offsetX, offsetY) => {
    const imageData = ctx.getImageData(offsetX, offsetY, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }

    ctx.putImageData(imageData, offsetX, offsetY);
  },

  brightness: (ctx, width, height, offsetX, offsetY) => {
    const imageData = ctx.getImageData(offsetX, offsetY, width, height);
    const data = imageData.data;
    const adjustment = 50;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += adjustment;
      data[i + 1] += adjustment;
      data[i + 2] += adjustment;
    }

    ctx.putImageData(imageData, offsetX, offsetY);
  },

  contrast: (ctx, width, height, offsetX, offsetY) => {
    const imageData = ctx.getImageData(offsetX, offsetY, width, height);
    const data = imageData.data;
    const factor = 1.5;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = (data[i] - 128) * factor + 128;
      data[i + 1] = (data[i + 1] - 128) * factor + 128;
      data[i + 2] = (data[i + 2] - 128) * factor + 128;
    }

    ctx.putImageData(imageData, offsetX, offsetY);
  },

  vintage: (ctx, width, height, offsetX, offsetY) => {
    const imageData = ctx.getImageData(offsetX, offsetY, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const brightness =
        data[i] * 0.34 + data[i + 1] * 0.5 + data[i + 2] * 0.16;
      data[i] = Math.min(255, brightness + 40);
      data[i + 1] = Math.min(255, brightness + 10);
      data[i + 2] = Math.max(0, brightness - 40);
    }

    ctx.putImageData(imageData, offsetX, offsetY);
  },
};
