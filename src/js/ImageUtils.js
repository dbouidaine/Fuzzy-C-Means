const getImageData = (img)=>{
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, img.width, img.height);
    return imageData
}

const ImageData2Canvas = (ctx,image_data) =>{

}


const deleteRed = (image_array)=>{
    for(let i=0;i<image_array.length;i++){
        // Red %4, Green %1, Blue %2, Alpha % 3
        if(i%4 == 0){
            image_array[i] = 255
        }
    }
    console.log("Done deleting Red channel !")
    return image_array
}

const convertToGray = (image_array) =>{
    console.log("Converting to gray !!!")
    for(let i=0;i<image_array.length;i+=4){
        let gray = (image_array[i]+image_array[i+1]+image_array[i+2]) / 3
        image_array[i] = gray 
        image_array[i+1] = gray 
        image_array[i+2]= gray
    }
}

function distanceMeasure(a, b, power) {
    return a
        .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
        .reduce((sum, now) => sum + now) // sum
        ** power
}
// now use it with any array
// make sure both arrays have the same number of elements
// let euc = eucDistance([1,2,5,6,4.6], [4,6,33,45,2.5]);
// console.log(euc);


const randomPixel = (min,max)=>{
    let random_value = Math.floor(Math.random() * (max-min)) + min;
    return [random_value,random_value,random_value]
}

// const drawPixels()