class FuzzyCMeans {
    constructor(c,epsilon,m,image_data_ref,canvas_ctx_ref){
        this.C = c
        this.epsilon = epsilon
        this.M = m
        this.image_data_ref = image_data_ref
        this.image_array_ref = this.image_data_ref.data
        this.width = this.image_data_ref.width
        this.height = this.image_data_ref.height
        this.num_pixels = Math.floor(this.image_array_ref.length / 4)
        this.centroides = this.intitCentroides()
        this.U = []
        this.UPlus = []
        this.isFirstStep = true
        this.stop = false
        this.num_steps = 0
        this.initColors = this.intitCentroides()
        this.canvas_ctx = canvas_ctx_ref

        this.calculateMemShipMat()
        console.log(this.centroides)
    }

    intitCentroides = () =>{
         // init centroides with dispersion between pixels
        let space = Math.floor(255 / this.C)
        let centres = []
        for (let i=0;i<this.C;i++){
            centres.push(randomPixel(i*space, i*space + space))
        }
        return centres
    }

    calculateCentroides = () =>{
        for(let j=0;j<this.C;j++){
            let sum_up = 0
            let sum_down = 0
            let nan_start = false
            for(let i=0;i<this.num_pixels;i++){
                let i4 = i*4
                sum_up = math.add(sum_up, math.multiply(this.UPlus[i][j] ** this.M,[this.image_array_ref[i4],this.image_array_ref[i4+1],this.image_array_ref[i4+2]]))
                sum_down+= this.UPlus[i][j] ** this.M
            }
            this.centroides[j] = math.multiply(1/(sum_down),sum_up)
        }
        console.log(this.centroides)
    }

    calculateMemShipMat = () =>{
        this.U = this.UPlus.map(function(arr) {
            return Array.from(arr);
        })

        /* U & UPlus form
        [
            [pixel_0-centoide_0, pixel_0-centroide_1, pixel_0-centroide_2, ...]
            ,...
        ] */
        for(let i=0;i<this.num_pixels;i++){
            let i4 = i*4
            let distances = []
            for(let j=0;j<this.C;j++){
                let distance = distanceMeasure([this.image_array_ref[i4],this.image_array_ref[i4+1],this.image_array_ref[i4+2]],this.centroides[j],(1/(this.M-1)))
                distances.push(distance)
            }
            let u_i = []
            for(let j=0;j<this.C;j++){
                let sum = 0
                for(let k=0;k<this.C;k++){
                    sum += distances[j] / (distances[k]+0.0001)
                }
                sum = 1 / (sum+0.0001)
                if(sum > 1) sum = 0.99 // Regularize
                if(this.isFirstStep){
                    u_i.push(sum)
                }
                else{
                    this.UPlus[i][j] = sum
                }
            }
            if(this.isFirstStep){
                this.UPlus.push(u_i)
            }
        }
        this.isFirstStep = false
    }

    shouldStop = ()=>{
        // Calculate difference between UPlus and U
        let difference = math.subtract(this.UPlus,this.U) 
        let max_value = math.max(math.abs(difference))
        return (max_value < this.epsilon)

    }


    drawSegmentation = ()=>{
        let arr_pixel = new Uint8ClampedArray(this.num_pixels * 4);
        for(let i=0;i<this.num_pixels;i++){
            let u_i = Array.from(this.UPlus[i])
            let max_index = 0,max_value = 0
            for(let j=0;j<this.C;j++){
                if (u_i[j] >= max_value){
                    max_value = u_i[j]
                    max_index = j
                }
            }
            arr_pixel[i*4] = this.initColors[max_index][0]
            arr_pixel[i*4+1] = this.initColors[max_index][1]
            arr_pixel[i*4+2] = this.initColors[max_index][2]
            arr_pixel[i*4+3] = 255
        }
        let imageData = new ImageData(arr_pixel,this.width, this.height, { colorSpace: "srgb" });
        this.canvas_ctx.putImageData(imageData,0,0)
    }

    step = ()=>{
        // if the algorithm should stop, it will return with a false value, else it will return with true
        // we could change it to force algorithm to step !
        if (this.stop) {
            console.log("Termination Criterion Met ! You are forcing step !")
        }
        // 1. If first step, initialize centroides /////// DONE !!!!!!!!
        //if(this.isFirstStep) this.intitCentroides()

        // 2. Else, calculate centroides ///////////// TODO !!!!!!!!!!!
        //else 
        this.calculateCentroides()

        // 3. Update U, UPlus !
        this.calculateMemShipMat()
        
        // 4. Si if I should stop or not !             ///////////// TODO !!!!!!!!!!!
        this.stop = this.shouldStop()

        // Update number of steps !
        this.num_steps+=1
        
        this.drawSegmentation()

        return this.stop
    }

    autoStep = ()=>{
        while (! this.stop ) this.step()
        // if the algorithm should stop, it will return with a false value, else it will return with true
        // we could change it to force algorithm to step !
        if (this.stop) {
            console.log(this.num_steps)
        }

        return this.stop
    }
}
