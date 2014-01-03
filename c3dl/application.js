// Tutorial 2: the javascript
// The models used need to be parsed before the page
// render. This code will parse the model files
// and when this is complete the parser will call the
// main. The argument being passed - "tutorial" -
// is the id of the canvas element on the html page.

c3dl.addMainCallBack(canvasMain, "pool");
c3dl.addModel("queue.dae")
c3dl.addModel("table.dae")
var pool;
var table;
var queue;
var isDragging = false; //tracks or not the user is currently dragging the mouse
var rotationStartCoords = [0,0]; //The mouse coordinates at the beginning of a rotation
var SENSITIVITY = 0.7;

//Called when the user releases the left mouse button.
//Records that the user is no longer dragging the mouse
function mouseUp(evt)
{
	if(evt.which == 1)
	{
		isDragging = false;
	}
}

//Called when the user presses the left mouse button.
//Records that the user may start to drag the mouse, along with the current X & Y
// coordinates of the mouse.
function mouseDown(evt)
{
	if(evt.which == 1)
	{
		isDragging = true;
		rotationStartCoords[0] = xevtpos(evt);
		rotationStartCoords[1] = yevtpos(evt);
	}
}

//Called when the mouse moves
//This function will only do anything when the user is currently holding
// the left mouse button.  It will determine how far the cursor has moved
// since the last update and will pitch and yaw the camera based on that
// amount and the sensitivity variable.
function mouseMove(evt)
{
	if(isDragging == true)
	{
        var cam = scn.getCamera();
		var x = xevtpos(evt);
		var y = yevtpos(evt);
		
		// how much was the cursor moved compared to last time
		// this function was called?
		var deltaX = x - rotationStartCoords[0];
                var deltaY = y - rotationStartCoords[1];

		cam.yaw(-deltaX * SENSITIVITY);
		cam.pitch(deltaY * SENSITIVITY);
		
		// now that the camera was updated, reset where the
		// rotation will start for the next time this function is 
		// called.
		rotationStartCoords = [x,y];
	}
}

//Calculates the current X coordinate of the mouse in the client window
function xevtpos(evt)
{
    return 2 * (evt.clientX / evt.target.width) - 1;
}

//Calculates the current Y coordinate of the mouse in the client window
function yevtpos(evt)
{
    return 2 * (evt.clientY / evt.target.height) - 1;
}



//This function is called whenever a key is released.
//If the key released was the space-bar, the camera will switch
// which object it is orbiting.
function swapOrbitPoint(evt) {
	if(evt.keyCode == 32) {
		var cam = scn.getCamera();
		//compare the camera's orbit point with the location of the duck
		if(c3dl.isVectorEqual(cam.getOrbitPoint(),duck.getPosition())) {
			cam.setOrbitPoint(teapot.getPosition());
		}
		else{
			cam.setOrbitPoint(duck.getPosition());
		}
	}
}

// The program main
function canvasMain(canvasName){

 // Create new c3dl.Scene object
 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);

 // Create GL context
 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);

 // Attach renderer to the scene
 scn.setRenderer(renderer);
 scn.init(canvasName);

 //the isReady() function tests whether or not a renderer
 //is attached to a scene.  If the renderer failed to
 //initialize this will return false but only after you
 //try to attach it to a scene.
 if(renderer.isReady() )
 {   

 pool = new c3dl.Sphere(5);
 table = new c3dl.Plane(500,500)
 queue = new c3dl.Collada();

queue.init("queue.dae")
pool.setTexture("billard_black_8.png");
pool.setPosition([0.0,2.0,0.0])
table.setTexture("felt.png")
 // Give the duck a bit of a spin on y
 

 // Add the object to the scene
 scn.addObjectToScene(pool);
 scn.addObjectToScene(table);
 scn.addObjectToScene(queue);

 // Create a camera
  cam = new c3dl.OrbitCamera();
  cam.setFarthestDistance(1000);
  cam.setClosestDistance(20);	
  cam.setOrbitPoint(pool.getPosition());
  cam.setDistance(55);
  scn.setCamera(cam);


// Add some lights
 spot = new c3dl.SpotLight();
 spot.setPosition([0.0, 150.0, 0.0]);
 spot.setDirection([0.0,-1.0,0.0]);
 spot.setSpecular([0.5,0.5,0.5,1.0]);
 spot.setDiffuse([0.2,0.2,0.2,1.0]);
 spot.setAmbient([0.8,0.8,0.8,1.0]);
 spot.setCutoff(180);
 spot.setExponent(1)
 spot.setOn(true);

 //scn.addLight(spot);

 //scn.setAmbientLight([0,0,0,0]);
 scn.setMouseCallback(mouseUp,mouseDown, mouseMove);
 // Start the scene
 scn.startScene();
 }


}

function onRedClick(){
	pool.setTexture("billard_red_15.png");
}

function onBlackClick(){
	pool.setTexture("billard_black_8.png");
}