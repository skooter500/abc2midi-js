call vcvars32.bat
cd src
cl genmidi.c midifile.c parseabc.c parser2.c queues.c store.c stresspat.c /Fe../abc2midi.exe
call emcc genmidi.c midifile.c parseabc.c parser2.c queues.c store.c stresspat.c wrapper.c tunepal/FFT.cpp tunepal/FuzzyHistogram.cpp tunepal/PitchDetector.cpp tunepal/pitchspeller.cpp tunepal/transcriber.cpp tunepal/tunepal.cpp tunepal/utils.cpp -o ../abc2midi.js --pre-js wrapper.js -s EXPORTED_FUNCTIONS="['_main', '_abc2midiC', '_transcribe', '_transcribeTest', '_transcribeTest1']" -s INVOKE_RUN=0
cd ..
copy abc2midi.js  ..\tunepal-web\app\lib\abc2midi
copy abc2midi.js.mem  ..\tunepal-web\app
