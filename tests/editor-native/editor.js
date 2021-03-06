var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX = 0;           // current element offset
var _offsetY = 0;
var _dragElement;           // needs to be passed from onMouseDown to onMouseMove
var _oldZIndex = 0;         // we temporarily increase the z-index during drag
var _debug;                 // makes life easier

/* Extract integer number */
function extractNumber(value) {
	var n = parseInt(value, 10);
	return (n === null || isNaN(n)) ? 0 : n;
}

/* this is simply a shortcut for the eyes and fingers */
function $(id) {
	return document.getElementById(id);
}

/* Create main element */
function createMainElement(args) {
	var args = args || {};
	var paper = args.paper;
	var x = args.x || 100;
	var y = args.y || 100;
	var r = paper.rect(x, y, x+300, y+95);
	r.attr({fill: "#e3d7f4"});
	return r;
}

/* Init drag&drop at onLoad event */
window.onload = function(){
	InitDragDrop();
	_debug = $('debug');
	
	/* Setup canvas */
	var blocks = $('blocks');
	var paper = Raphael(blocks, 800, 600);
	
	/* Draw initial elements */
	var main = createMainElement({'paper':paper,'x':1, 'y':1});
	
}

/* Init drag&drop */
function InitDragDrop() {
	document.onmousedown = onMouseDown;
	document.onmouseup = onMouseUp;
}

/* onMouseDown handler */
function onMouseDown(e) {
	var left_click = e ? 0 : 1;            // for IE, left click is 1; for Firefox, left click is 0
	var e = e || window.event;             // IE is retarded and doesn't pass the event object
	var target = e.target || e.srcElement; // IE uses srcElement, others use target
	
	_debug.innerHTML = target.className === 'item' ? 'draggable element clicked' : 'NON-draggable element clicked';
	
	if(target.className !== 'item') return;
	if(e.button !== left_click) return;
	
	// grab the mouse position
	_startX = e.clientX;
	_startY = e.clientY;
	
	// grab the clicked element's position
	_offsetX = extractNumber(target.style.left);
	_offsetY = extractNumber(target.style.top);
	
	// bring the clicked element to the front while it is being dragged
	_oldZIndex = target.style.zIndex;
	target.style.zIndex = 10000;
	
	// we need to access the element in onMouseMove
	_dragElement = target;
	
	// tell our code to start moving the element with the mouse
	document.onmousemove = onMouseMove;
	
	// cancel out any text selections
	document.body.focus();
	
	// prevent text selection in IE
	document.onselectstart = function () { return false; };
	
	// prevent IE from trying to drag an image
	target.ondragstart = function() { return false; };
	
	// prevent text selection (except IE)
	return false;
}

function onMouseMove(e) {
	var e = e || window.event; 
	
	// this is the actual "drag code"
	_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
	_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';
}

function onMouseUp(e) {
	if (!_dragElement) return;
	
	_dragElement.style.zIndex = _oldZIndex;
	
	// we're done with these events until the next onMouseDown
	document.onmousemove = null;
	document.onselectstart = null;
	_dragElement.ondragstart = null;
	
	// this is how we know we're not dragging      
	_dragElement = null;
	_debug.innerHTML = 'mouse up';
}

