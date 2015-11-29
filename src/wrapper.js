function downloadMidiFromAbc(abc, fileName)
{
	var midi = abc2midi(abc);
	download(midi, fileName);	
}

function transcribe(signal, sampleRate, sampleTime, midi)
{

	var arrayptr = Module._malloc(signal.length*4);
	writeFloatArray(arrayptr,signal);
	
	var result = Module.ccall('transcribe', // name of C function
	  'number', // return type
	  ['number', 'number', 'number', 'number'], // argument types
	  [arrayptr, sampleRate, sampleTime, midi]); // arguments
	var retstr = Pointer_stringify(result);
	return retstr;	
}

function transcribeTest(sampleRate, sampleTime, midi)
{
	var result = Module.ccall('transcribeTest', // name of C function
	  'string', // return type
	  ['number', 'number', 'number'], // argument types
	  [sampleRate, sampleTime, midi]); // arguments
	return result;
}

function writeFloatArray(ptr,array) 
{ 
  for(i=0;i<array.length;i++) 
  {
    Module.setValue(ptr,array[i],'float');
    ptr += 4;
  } 
}

function transcribeTest1(signal, sampleRate, sampleTime, midi)
{
	var arrayptr = Module._malloc(signal.length*4);
	writeFloatArray(arrayptr,signal);
	
	var result = Module.ccall('transcribeTest1', // name of C function
	  'number', // return type
	  ['number', 'number', 'number', 'number'], // argument types
	  [arrayptr, sampleRate, sampleTime, midi]); // arguments
	var retstr = Pointer_stringify(result);
	return retstr;
}
function abc2midi(abcSource)
{
	console.log(abcSource);
	var inFile = "in.abc";
	
	try
	{
		FS.unlink(inFile);
	}
	catch(err)
	{
	}
		
	FS.createDataFile("/", inFile, abcSource, true, true);
	var result = Module.ccall('abc2midiC', // name of C function
	  'number', // return type
	  [], // argument types
	  []); // arguments
	
	var fName = "out.mid";
	var stat = FS.stat(fName);  
	var f = FS.open(fName, "r");
	var buf = new Uint8Array(stat.size);
	FS.read(f, buf, 0, stat.size, 0);
	FS.close(f);
	return buf;
}

function download(buf, fileName)
{
	var element = document.createElement('a');
	var b64encoded = btoa(String.fromCharCode.apply(null, buf));
    element.setAttribute('href', 'data:application/octet-stream;base64,' + b64encoded);
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
