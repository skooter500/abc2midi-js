cd src
call emcc genmidi.c midifile.c parseabc.c parser2.c queues.c store.c -o ../abc2midi.js --pre-js wrapper.js -s EXPORTED_FUNCTIONS="['_main', '_abc2midiC']" -s INVOKE_RUN=0 -O3
cd ..