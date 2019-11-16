let w = 1000;
let img, d, slider_circles, slider_weight, slider_increment, slider_x_rot, slider_y_rot;
function preload(){
    img = loadImage("images/61jL3Wx-xCL._SL1000_.jpg");
}
function draw_image_wrapper(){
    draw_image(img, slider_circles.value(), slider_weight.value(), slider_increment.value());
}
function setup() {
    createCanvas(w, w);
    slider_circles = createSlider(1, 200, 100, 1);
    slider_weight = createSlider(0.5, 10, 5, 0.5);
    slider_increment = createSlider(0.01, PI/16, 0.01, 0.01);
    slider_x_rot = createSlider(-4, 4, 0, 0.5);
    slider_y_rot = createSlider(-4, 4, 0, 0.5);
    draw_image_wrapper();
    slider_circles.elt.onchange = draw_image_wrapper;
    slider_weight.elt.onchange = draw_image_wrapper;
    slider_increment.elt.onchange = draw_image_wrapper;
    slider_x_rot.elt.onchange = draw_image_wrapper;
    slider_y_rot.elt.onchange = draw_image_wrapper;
}
function draw_image(img, num_of_circles, strokeconst, increment){
    img.resize(img.width<img.height? w:0, img.width<img.height? 0:w);
    img = img.get((img.width-w)/2,(img.height-w)/2, w, w);
    img.loadPixels();
    pixelDensity(1);
    background(255);
    translate(w/2, w/2);
    noFill();
    for(let i = 1; i < num_of_circles; i++){
        let radius = i*(w/num_of_circles)/2;
        for(let x = round(-radius); x < round(radius)+1; x++){
            for(let y = round(-radius); y < round(radius)+1; y++){
                let tmp = x*x + y*y;
                if(tmp <= radius*radius && tmp >= (radius-1)*(radius-1)){
                    let index = 4*(((w/2 + y)*w + (w/2 + x)));
                    let colorsum = img.pixels[index]+img.pixels[index+1]+img.pixels[index+2];
                    //stroke(img.pixels[index],img.pixels[index+1],img.pixels[index+2]);
                    strokeWeight(strokeconst-((colorsum/(3*255))*strokeconst));
                    let offset = x<0 ? PI : 0;
                    arc(slider_x_rot.value()*i, slider_y_rot.value()*i,
                        radius*2, radius*2, 
                        atan(y/x)+offset, atan(y/x)+offset+increment);
                }
            }
        }
        strokeWeight(0.5);
        circle(0, 0, radius*2);
    }
}
window.addEventListener("load", ()=>{
    let input = document.getElementById("file-input");
    input.onchange = (e) => img = loadImage("images/"+input.value.split("\\")[2], draw_image_wrapper);
    
})