const canvas =document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");



const CANVAS_SIZE=700;


canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle="black";
ctx.fillStyle="black";
ctx.lineWidth=2.5;


let painting= false;
let filling= false;

function startPainting(){
    painting=true;
}
function stopPainting(){
    painting=false;
}

function onMousMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
   if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
   }else{
       ctx.lineTo(x,y);
       ctx.stroke();
   }
}

function handleColorClick(event){
   const color= event.target.style.backgroundColor;
   ctx.strokeStyle=color;
   ctx.fillStyle=color;
}

function handleRangeChange(event){
    const lineWidth =event.target.value;
    ctx.lineWidth=lineWidth;
}
function handleMode(){
    if(filling){
        filling=false;
        mode.innerText="Fill"
    }else{
        filling=true;
        mode.innerText="Paint"
        
    }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image=canvas.toDataURL("image/jpeg");
    const link=document.createElement("a");
    link.href=image;
    link.download="Paint[EXPORT]"
    link.click();
}
if(canvas){
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mousemove", onMousMove);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);

}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleMode);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}