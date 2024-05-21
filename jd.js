const randomOffset = (max) => {
    return Math.floor(Math.random() * max)
}

const drawLine = (ctx, textCtx, y, width) => {
    const step = 4;
    const wiggle = 4;
    var poly = new Path2D();
    poly.moveTo(step, y)
    let x = step * 2;
    while (x < width) {
        let w = randomOffset(wiggle);
        let textData = textCtx.getImageData(x, y, 20, 20).data
        let avg = textData.reduce((sum, value) => sum + value, 0) / textData.length

        /*
        if (Math.floor(Math.random() * 100) == 88) {
            w = 88
            console.log(avg)
        }
        */
        poly.lineTo(x, y - w - avg);
        x = x + step;
    }
    poly.lineTo(x - step, y);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
    ctx.fill(poly)
    ctx.strokeStyle = "lightgray"
    ctx.stroke(poly);
}

const draw = words => {
    const width = window.innerWidth - 10;
    const height = window.innerHeight - 100;

    const textCanvas = new OffscreenCanvas(width, height);
    const textCtx = textCanvas.getContext("2d", { willReadFrequently: true });
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const fontHeight = Math.floor((height / words.length) * 0.85)
    textCtx.font = `${fontHeight}px serif`;
    console.log(ctx.font);
    textCtx.textAlign = "center"

    let y = fontHeight;
    for (w of words) {
        console.log(w);
        textCtx.fillText(w, width / 2, y);
        y = y + fontHeight;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    y = 6;
    while (y < canvas.height) {
        drawLine(ctx, textCtx, y, canvas.width - 10);
        y = y + 20;
    }
}

const drawSubmit = text => {
    console.log(text)
    let words = text.split(',');
    console.log(words);
    draw(words)
}