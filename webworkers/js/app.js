var useWebWorker = true;

// Step 1: Define the webworker's behaviour

// This web worker is going to constantly calculate fibonatchi numbers 
// in the background and send every 10 millionth one to the main thread.
workerClosure = function() {
  var FibNMinus2 = 0;
  var FibNMinus1 = 1;
  var n = 2;

  while(n++)
  {
    fib = FibNMinus2 + FibNMinus1;
    FibNMinus2 = FibNMinus1;
    FibNMinus1 = fib;
    if (n%(10*1000*1000) == 0)
    {
      postMessage(fib + "(Iteration #"+n+")");
    }
  }
}


if (useWebWorker == true)
{

  // Step 2: Create the web worker

  var text = workerClosure.toString()
    .replace(/^\s*function\s*\(\) {/, "")
    .replace(/}\s*$/, '');

  var blob = new Blob([text], {type: "text/javascript"});

  var url = (window.URL || window.webkitURL).createObjectURL(blob);

  var worker = new Worker(url);


  // Step 3: Talk to the web worker from the main process

  worker.addEventListener("message", function(event) {
    console.log("worker: "+event.data);
  })

}
else
{
  // To demonstrate what this would normally do the chrome we can also try 
  // running it in the main process. Warning: Chrome may crash.

  postMessage = function(msg){console.log(msg);}
  setTimeout(workerClosure, 0);
}
