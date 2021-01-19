const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// canvas는 context를 갖고 있는 HTML 요소
// context는 요소 안에서 픽셀에 접근할 수 있는 방법
// canvas의 자세한 설명 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
// canvas는 2가지 사이즈를 가짐 css 사이즈 / pixel manipulating 사이즈

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// canvas에 pixel modify 사이즈 주기
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// context 기본 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 마우스를 움직이는 내내 발생
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
// path는 선 (line) 이라고 생각하면 됨

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  //ctx.lineWidth = event.
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.prventDefault(); //우클릭 방지
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[Export]";
  link.click();
}
// toDataURL MDN 으로ㅗ 검색

// 캔버스 내 마우스 움직입 감지
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
// clientX,Y 는 윈도우 전체의 범위 내에서 마우스 위치값을 나타냄
// canvas 내의 마우스 위치값은 offset
// mousedown : 클릭했을 때 발생하는 event
// mouseup : 클릭을 뗐을 때 발생하는 event
// mouseleave : 마우스가 영역을 벗어낫을 때 발생하는 event
// contextmenu : 웹에서 오른쪽 마우스 클릭할 시 나타나는 메뉴

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
// range가 존재한다면
// range evnet는 input에 반응

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
//mode가 존재한다면

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
// saveBtn이 존재한다면

//console.log(Array.from(colors));
//console.log(Array.from(colors));
// array.from 메소드는 object로 부터 array를 만듦
