let image_real
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
    if(event.target.value < 1) {
        event.preventDefault()
        event.target.value = 1
    }
})

let cmeans = null
// Constrcut FuzzyCMeans
$("#construct_algo").click((event)=>{
        let C = $("#num_clusters").val()
        let M=$("#m_constant").val()
        let epsilon=$("#termination_criterion").val()
        console.log(C,epsilon,M)
        // get image data (converts html image to a 1-dim array of srgb values (RGBA))
        // (Red,Green,Blue,Alpha)
        let image = getImageData(image_real)

        // Regroupe RGBA
        let image_array = Array.from(image.data)
        let image_pixels =math.reshape(image_array,[image.height * image.width,4])
        console.log(image)
        console.log(image_pixels)

        // Create Fuzzy C-Means class
        cmeans = new FuzzyCMeans(C,epsilon,M,image)
        $("#success_alert_construct_algo").attr("hidden",false)
})