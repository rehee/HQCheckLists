/**
 * RGB interface
 */
interface IRGB {
    r: number;
    g: number;
    b: number;
    a: number;
}

/**
* ESCPOS image
*/
export class ESCPOSImage {

    // Data
    private data: number[] = [];

    // Width
    private width: number = 0;

    // Height
    private height: number = 0;

    /**
     * Constructor
     * @param image
     */
    constructor(image: HTMLImageElement) {
        // Set width
        this.width = image.width;

        // Set height
        this.height = image.height;

        // Get image context
        let ctx = this.getContext(image);

        // Get data
        this.data = this.getBitData(ctx);
    }

    /**
     * Get bit data
     * @param ctx
     */
    private getBitData(ctx: CanvasRenderingContext2D): number[] {
        // Init result
        let result: number[] = [];

        // Iterate rows
        for (let y = 0; y < this.height; y++) {
            // Iterate columns
            for (let x = 0; x < this.width; x++) {
                // Get pixel
                let pixel = ctx.getImageData(x, y, 1, 1).data;

                // Get rgb
                let rgb = this.getRGB(pixel);

                // Get rgb value
                let value = rgb.r + rgb.g + rgb.b;

                // Add bit to result
                result.push(value > 0 ? 0 : 1);
            }
        }

        // Return result
        return result;
    }

    /**
     * Get image context
     * @param image
     */
    private getContext(image: HTMLImageElement): CanvasRenderingContext2D {
        // Create canvas
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        // Set context
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        // Return context
        return context;
    }

    /**
     * Get RGB
     * @param pixel
     */
    private getRGB(pixel: any): IRGB {
        // Return RGB
        return {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2],
            a: pixel[3]
        }
    }

    /**
     * To raster
     */
    public toRaster() {
        // Init result
        let result = [];

        // Get width and height
        let width = this.width;
        let height = this.height;

        // N block lines
        let n = Math.ceil(width / 8);

        // Iterate
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < n; x++) {
                for (let b = 0; b < 8; b++) {
                    let i = x * 8 + b;

                    if (result[y * n + x] === undefined) {
                        result[y * n + x] = 0;
                    }

                    let c = x * 8 + b;

                    if (c < width) {
                        if (this.data[y * width + i]) {
                            result[y * n + x] += (0x80 >> (b & 0x7));
                        }
                    }
                }
            }
        }

        // Return result
        return {
            data: result,
            width: n,
            height: height
        };
    }
}

export class ImageExtend {
    static GetImageDimensions(file) {
        return new Promise(function (resolved, rejected) {
            let i = new Image()
            let canvas: HTMLCanvasElement = window.document.createElement('canvas')
            let ctx = canvas.getContext('2d');
            canvas.width = 96;
            canvas.height = 48;
            i.onload = function () {
                var CanvasToBMP = {

                    /**
                     * Convert a canvas element to ArrayBuffer containing a BMP file
                     * with support for 32-bit (alpha).
                     *
                     * Note that CORS requirement must be fulfilled.
                     *
                     * @param {HTMLCanvasElement} canvas - the canvas element to convert
                     * @return {ArrayBuffer}
                     */
                    toArrayBuffer: function (canvas) {

                        var w = canvas.width,
                            h = canvas.height,
                            w4 = w * 4,
                            idata = canvas.getContext("2d").getImageData(0, 0, w, h),
                            data32 = new Uint32Array(idata.data.buffer), // 32-bit representation of canvas

                            stride = Math.floor((32 * w + 31) / 32) * 4, // row length incl. padding
                            pixelArraySize = stride * h,                 // total bitmap size
                            fileLength = 122 + pixelArraySize,           // header size is known + bitmap

                            file = new ArrayBuffer(fileLength),          // raw byte buffer (returned)
                            view = new DataView(file),                   // handle endian, reg. width etc.
                            pos = 0, x, y = 0, p, s = 0, a, v;

                        // write file header
                        setU16(0x4d42);          // BM
                        setU32(fileLength);      // total length
                        pos += 4;                // skip unused fields
                        setU32(0x7a);            // offset to pixels

                        // DIB header
                        setU32(108);             // header size
                        setU32(w);
                        setU32(-h >>> 0);        // negative = top-to-bottom
                        setU16(1);               // 1 plane
                        setU16(32);              // 32-bits (RGBA)
                        setU32(3);               // no compression (BI_BITFIELDS, 3)
                        setU32(pixelArraySize);  // bitmap size incl. padding (stride x height)
                        setU32(2835);            // pixels/meter h (~72 DPI x 39.3701 inch/m)
                        setU32(2835);            // pixels/meter v
                        pos += 8;                // skip color/important colors
                        setU32(0xff0000);        // red channel mask
                        setU32(0xff00);          // green channel mask
                        setU32(0xff);            // blue channel mask
                        setU32(0xff000000);      // alpha channel mask
                        setU32(0x57696e20);      // " win" color space

                        // bitmap data, change order of ABGR to BGRA
                        while (y < h) {
                            p = 0x7a + y * stride; // offset + stride x height
                            x = 0;
                            while (x < w4) {
                                v = data32[s++];                     // get ABGR
                                a = v >>> 24;                        // alpha channel
                                view.setUint32(p + x, (v << 8) | a); // set BGRA
                                x += 4;
                            }
                            y++
                        }

                        return file;

                        // helper method to move current buffer position
                        function setU16(data) { view.setUint16(pos, data, true); pos += 2 }
                        function setU32(data) { view.setUint32(pos, data, true); pos += 4 }
                    },

                    /**
                     * Converts a canvas to BMP file, returns a Blob representing the
                     * file. This can be used with URL.createObjectURL().
                     * Note that CORS requirement must be fulfilled.
                     *
                     * @param {HTMLCanvasElement} canvas - the canvas element to convert
                     * @return {Blob}
                     */
                    toBlob: function (canvas) {
                        return new Blob([this.toArrayBuffer(canvas)], {
                            type: "image/bmp"
                        });
                    },

                    /**
                     * Converts the canvas to a data-URI representing a BMP file.
                     * Note that CORS requirement must be fulfilled.
                     *
                     * @param canvas
                     * @return {string}
                     */
                    toDataURL: function (canvas) {
                        var buffer = new Uint8Array(this.toArrayBuffer(canvas)),
                            bs = "", i = 0, l = buffer.length;
                        while (i < l) bs += String.fromCharCode(buffer[i++]);
                        return "data:image/bmp;base64," + btoa(bs);
                    }
                };

                ctx.drawImage(i, 0, 0, 96, 48);
                resolved({ w: canvas.width, h: canvas.height, img: i, data: CanvasToBMP.toDataURL(canvas) })
            };
            i.src = file;
        })
    }
}