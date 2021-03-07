import { assertExists } from './guards';

/**
 * Create a new canvas and 2D Graphics Context
 * 
 * @param widthOrSize - the width (or square edge length) of the canvas
 * @param height - the height of the canvas (if not square)
 * @returns
 * 
 * @alpha 
 */
export function makeCanvas(widthOrSize: number, height?: number): { canvas: HTMLCanvasElement, context: CanvasRenderingContext2D} {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = widthOrSize;
  canvas.height = height || widthOrSize;
  assertExists(context, '2d graphics context');
  return { canvas, context };
}

/**
 * Create an ImageData value for a rectangle of a solid color
 * 
 * @param color - color specifier (`#f0f` or `rgb(240, 100, 80)`)
 * @param w - width
 * @param h - height
 * @returns 
 * 
 * @alpha
 */
export function makeIconFromColor(color: string, w: number, h?: number): ImageData {
  const { context } = makeCanvas(w,h);
  context.fillStyle = color;
  context.fillRect(0, 0, w, h || w);
  // context.textAlign = 'center';
  // context.textBaseline = 'middle';
  // context.font = '11px Arial';
  // context.fillText('69F', 8, 8);
  return context.getImageData(0, 0, w, h || w);
}
