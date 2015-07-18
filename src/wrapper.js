function downloadMidiFromAbc(abc, fileName)
{
	var midi = abc2midi(abc);
	download(midi, fileName);	
}

function abc2midi(abc)
{
	var inFile = "in.abc";
	
	try
	{
		FS.unlink(inFile);
	}
	catch(err)
	{
	}
		
	FS.createDataFile("/", inFile, abcContents, true, true);
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
