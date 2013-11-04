// In this example we load and parse some information from a binary 3D mesh
// file in js

// Step 1: Make a AJAX Blob Request to get the binary 3D mesh

var url = "./assets/pawn.stl";
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.responseType = "blob";
xhr.onload = onLoad;
xhr.send();

// Step 2: Converte the blob into a array buffer so we can access it's bites

function onLoad(e) {
  var reader = new FileReader();
  reader.onload = onFileReaderLoad;
  reader.readAsArrayBuffer(xhr.response);
};

// Step 3: Parse the first triangle of the 3D Mesh
// http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL

function onFileReaderLoad(e) {
  var arrayBuffer = e.target.result;
  var dataView = new DataView(arrayBuffer);

  vertices = [0, 1, 2].map(function(i) {
    return [0,1,2].map(function(j) {
      return dataView.getFloat32(80+j+i*3, true)
    });
  });

  console.log(vertices);
}
