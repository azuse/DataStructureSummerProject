var canvas = $("canvas")[0];
ctx = canvas.getContext("2d");

// if (canvas.getContext) {

//   ctx.fillStyle = "rgb(100,100,100)";
//   ctx.fillRect(100, 500, 50, 500);
//   ctx.fillRect(150, 400, 50, 600);
//   ctx.fillRect(200, 200, 50, 800);
//   ctx.strokeStyle = "rgb(255,255,255)";
//   ctx.strokeRect(100, 500, 50, 500);
//   ctx.strokeRect(150, 400, 50, 600);
//   ctx.strokeRect(200, 200, 50, 800);

//   ctx.fillStyle = "black";
//   ctx.font = "50px timesnewroma";
//   ctx.fillText("5", 100, 1100);
//   ctx.fillText("6", 150, 1100);
//   ctx.fillText("8", 200, 1100,50);
// }
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var rectWidth;
var perLength;
var time = 500;

function drawRect(text, x, y, width, length) {
  ctx.fillStyle = 'white';
  ctx.fillRect(x,30,width,1200);
  ctx.fillStyle = "#eceff1";
  ctx.fillRect(x, y, width, length);
  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, width, length);
  ctx.fillStyle = "#29434e";
  ctx.fillRect(x, y - 40, width, 40);
  ctx.font = "35px timesnewroma";
  ctx.fillStyle = "black";
  ctx.fillText(text, x + width * 0.2, 1150, width * 0.5);
}

function drawRect(text, x, y, width, length, maincolor, topcolor) {
  ctx.fillStyle = 'white';
  ctx.fillRect(x,30,width,1200);
  ctx.fillStyle = maincolor;
  ctx.fillRect(x, y, width, length);
  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, width, length);
  ctx.fillStyle = topcolor;
  ctx.fillRect(x, y - 40, width, 40);
  ctx.font = "35px timesnewroma";
  ctx.fillStyle = "black";
  ctx.fillText(text, x + width * 0.2, 1150, width * 0.5);
}

function drawarr(arr) {
  rectWidth = 1000 / arr.length;
  temp = arr.slice(0);
  temp.sort(function(a, b) {
    return b - a;
  });
  perLength = 1000 / temp[0];
  for (item in arr) {
    x = rectWidth * item + 100;
    width = rectWidth;
    length = arr[item] * perLength;
    y = 1000 - length + 100;
    drawRect(arr[item], x, y, width, length, "#eceff1", "#29434e");
    ctx.font = "30px timesnewroma";
    ctx.fillStyle = 'gray';
    ctx.fillText(item,x + width*0.2, 30,width*0.5);
  }
}

async function drawSwap(arr, a, b) {
  x1 = rectWidth * a + 100;
  width1 = rectWidth;
  length1 = arr[a] * perLength;
  y1 = 1000 - length1 + 100;

  x2 = rectWidth * b + 100;
  width2 = rectWidth;
  length2 = arr[b] * perLength;
  y2 = 1000 - length2 + 100;

  drawRect(arr[a], x1, y1, width1, length1, "#ef5350", "#b61827");
  drawRect(arr[b], x2, y2, width2, length2, "#ef5350", "#b61827");
  await sleep(time);
  drawRect(arr[b], x1, y2, width1, length2, "#81c784", "#519657");
  drawRect(arr[a], x2, y1, width2, length1, "#81c784", "#519657");
  await sleep(time);
  drawRect(arr[b], x1, y2, width1, length2, "#eceff1", "#29434e");
  drawRect(arr[a], x2, y1, width2, length1, "#eceff1", "#29434e");
  await sleep(time);
}

async function swap(arr, a, b) {
  await drawSwap(arr, a, b);
  temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  
}

async function max_heapfiy(arr, start, end) {
  var dad = start;
  var son = dad * 2 + 1;
  while (son < end) {
    if (son + 1 < end && arr[son + 1] > arr[son]) son++;
    if (arr[dad] >= arr[son]) return;
    else {
      await swap(arr, son, dad);
      dad = son;
      son = dad * 2 + 1;
    }
  }
}

async function heap_sort(arr) {
  var i;
  var len = arr.length;
  
  for (i = parseInt(len / 2) - 1; i >= 0; i--) await max_heapfiy(arr, i, len - 1);
  console.log(arr);
  for (i = len - 1; i > 0; i--) {
    await swap(arr, 0, i);
    await max_heapfiy(arr, 0, i - 1);
    console.log(arr);
  }
}

var arr;
$("#btn").bind("click",async function (e) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,1500,1500);
  string = $("#inputArray").val();
  arrstr = string.split(',');
  arr = Array();
  for(item in arrstr){
    arr[item] = parseInt(arrstr[item]);
  }
  await drawarr(arr);
  await heap_sort(arr);
});