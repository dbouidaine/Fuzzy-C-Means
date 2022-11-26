const getImageData = (img)=>{
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, img.width, img.height);
    return imageData
}