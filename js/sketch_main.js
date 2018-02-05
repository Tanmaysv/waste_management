var vertices = [];
var counter = 0;  //to maintain ID of each node
var cost_info = "";
function setup(){
	var canvas = createCanvas(1000, 500);
	canvas.id('mainCanvas');
	
}
function insert(){
	

	for(var i = 1; i <= 4; i++){                    // i === bin id, j === edge number
			
		var cost_array = [];

		for(var j =1; j <=3 ; j++){
			//var t = j-1;
			if(j<i){			
				cost_array[j] = document.getElementById("bin" + i).elements["e" + j].value;		
			}
			else{
				cost_array[j+1] =  document.getElementById("bin" + i).elements["e" + j].value;		
			}

		}
		var v = {

			x : Math.floor((Math.random() * 1000) + 1),
			y : Math.floor((Math.random() * 500) + 1),
			id : counter,
			cost : [cost_array[0], cost_array[1], cost_array[2], cost_array[3], cost_array[4]]
		};
		vertices[i-1] = v;   //edited
			counter++;
			for(var k =0 ; k < v.cost.length ; k++){
				if(v.cost[k] != undefined){

				cost_info = cost_info + " "+ v.cost[k]; //cost_array[k];
				}
			}
		cost_info = cost_info + "<br/>";	
	}
	writeIntodiv2();
		
}


/*function mousePressed(){


	var v = {

		x : mouseX,
		y : mouseY,
		id : counter,

	}
	vertices.push(v);
	counter++;
}*/

var dir = "";

function draw(){
	background(51);
	dir = "";


	var reached = [];
	var unreached = [];
	
	for(var i =0; i < vertices.length ; i++){        //since initially, all of the nodes are unreached
		unreached.push(vertices[i]);
	}   

	reached.push(unreached[0]);  //picking up a random starting point and putting it in our reached array !!!PROBLEM!!!

	unreached.splice(0,1);       //removing that starting point from the unreached array
	


	//MAIN ALGO STARTS HERE

	while(unreached.length > 0){
		var record = Number.MAX_VALUE;   //to evaluate the minimum of all the distances from our curr_index to the evaluated dest_index
		var curr_index;
		var dest_index;
		//var v1;
		//var v2;


		for(var i =0; i < reached.length ; i++){                //two for loops----for every element in the reached array, we loop over all elements of the unreached array

			for(var j = 0; j < unreached.length; j++){

				var v1 = reached[i];
				var v2 = unreached[j];

				//var d = dist(v1.x, v1.y, v2.x, v2.y);               //the dist() function will calculate thr edge weights based on the cartesian co-ordinates of that node in the canvas
				
				var d = v1.cost[v2.id];

				if(d < record){

					record = d;
					curr_index = i;	                        
					dest_index = j;

				}

			}

		}                               //at the end of these two loops..we get the indexes of the 
		stroke(255);
		
		line(reached[curr_index].x, reached[curr_index].y, unreached[dest_index].x, unreached[dest_index].y);

		dir = dir +  reached[curr_index].id + " -> " + unreached[dest_index].id + "<br/>";	

		reached.push(unreached[dest_index]);             // Now that we have found that nearest node, we add dt node into reaached array and remove from our unreached array
		unreached.splice(dest_index,1);
		

		if(unreached.length == 0){

			line(reached[0].x, reached[0].y, reached[reached.length-1].x, reached[reached.length -1].y);
			dir = dir +  reached[reached.length-1].id + " -> " + reached[0].id  + "<br/>";
			writeIntodiv1();		


		}

	}

	for(var i =0; i < vertices.length; i++){
		 fill(255);
		 stroke(255);
		 ellipse(vertices[i].x, vertices[i].y, 16, 16);

	}

}


function writeIntodiv1(){

	document.getElementById('directions').innerHTML = dir;


}

function writeIntodiv2(){

	document.getElementById("cost_info").innerHTML = cost_info;

}
