let image_real
let image_real_image_data
const loadImage = (event) =>{
    let image_show = document.getElementById('image_show')
    image_real = document.getElementById('image_real')

	image_show.src = URL.createObjectURL(event.target.files[0])
    image_real.src = URL.createObjectURL(event.target.files[0])

    console.log("Diaaaaa")
}

 // $.("#termination_criterion").on("key")

//onkeydown="if(event.key==='.'){event.preventDefault();}"

// Parametres Validation
$("#num_clusters").on("keydown",(event)=>{
    if(event.key === '.') event.preventDefault()
    if(event.target.value < 1) {
        event.preventDefault()
        event.target.value = 1
    }
})
$("#termination_criterion").on("input",(event)=>{
    if(event.target.value > 1 || event.target.value <0) {
        event.preventDefault()
        event.target.value = 0
    }
})
$("#m_constant").on("input",(event)=>{
    if(event.target.value <= 1) {
        event.preventDefault()
        event.target.value = 1.1
    }
})

let cmeans = null
// Constrcut FuzzyCMeans
$("#construct_algo").click((event)=>{
        $("#alert_warning_termination_criterion").attr("hidden",true)
        let C = $("#num_clusters").val()
        let M=$("#m_constant").val()
        let epsilon=$("#termination_criterion").val()
        console.log(C,epsilon,M)
        // get image data (converts html image to a 1-dim array of srgb values (RGBA))
        // (Red,Green,Blue,Alpha)
        let image = getImageData(image_real) // Gets image data object
        let test_canvas = $("#test_canvas")[0]  // Get canvas context (we will draw images in it)
        let canvas_draw_ctx = test_canvas.getContext('2d')
        test_canvas.height = image.height
        test_canvas.width = image.width
        
    
        // get the reference of the array that contains RGBA data ! when editing values it will directly
        // edite image !
        let image_array_ref = image.data
        

        // Create Fuzzy C-Means class
        cmeans = new FuzzyCMeans(C,epsilon,M,image,canvas_draw_ctx)
        // cmeans.step()
        $("#success_alert_construct_algo").attr("hidden",false)
        
        // Draw image data on canvas (final step)
        // canvas_draw_ctx.putImageData(image,0,0)
})

$("#step_cmeans").click(()=>{
    let stop = cmeans.step()
    if(stop){
        $("#alert_warning_termination_criterion").attr("hidden",false)
    }
})

$("#auto_step").click(()=>{
    cmeans.step()
    if(stop){
        $("#alert_warning_termination_criterion").attr("hidden",false)
    }
})

