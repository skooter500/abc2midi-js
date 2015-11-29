#include <string>
#ifdef __ANDROID__
#include <jni.h>
#endif
#include <stdio.h>
#include "utils.h"
#include "transcriber.h"
using namespace std;

int g_fundamental = 3;

extern "C" {
	const char * transcribeTest(float sampleRate, float sampleTime, bool midi)
	{
		printf("sampleRate %f\n", sampleRate);
		printf("sampleTime %f\n", sampleTime);
		printf("midi %d\n", midi);
		return "Hello world!";
	}		
}

extern "C"
{
	const char * transcribeTest1(float * signal, float sampleRate, float sampleTime, bool midi)
	{
		printf("signal %f %f\n", signal[0], signal[1]);
		printf("sampleRate %f\n", sampleRate);
		printf("sampleTime %f\n", sampleTime);
		printf("midi %d\n", midi);
		return "Hello world!";
	}
}
	

extern "C" {
	const char * transcribe(float * signal, float sampleRate, float sampleTime, bool midi)
	{
		printf("Signal %d\n", signal);
		printf("sampleRate %f\n", sampleRate);
		printf("sampleTime %f\n", sampleTime);
		printf("midi %d\n", midi);
		float f = 0.0f;
		bool b = false;
		Transcriber transcriber;
		transcriber.sampleRate = sampleRate;
		transcriber.sampleTime = sampleTime;
		transcriber.numSamples = sampleRate * sampleTime;
        transcriber.setSignal(signal);
		
		string transcription = transcriber.transcribe(& f, & b, midi);
		return transcription.c_str();
	}
}


#ifdef __ANDROID__
extern "C" {         
    //jint Java_org_tunepal_Transcriber_PowerSpectrum( JNIEnv* env,jobject thiz, jint frameSize, jfloatArray in, jfloatArray out)
    jstring Java_org_tunepal_Transcriber_fastTranscribe( JNIEnv* env,jobject thiz, jfloatArray in, jint fundamental, jint midi, jfloat sampleRate, jfloat sampleTime)
    {
		
		
        float f = 0.0f;
        bool b = false;
        jfloat *signal = env->GetFloatArrayElements(in, 0);
		g_fundamental = fundamental;		
        Transcriber transcriber;
		transcriber.sampleRate = sampleRate;
		transcriber.sampleTime = sampleTime;
		transcriber.numSamples = sampleRate * sampleTime;
        transcriber.setSignal(signal);
		//return env->NewStringUTF("HELLO!");
        string transcription = transcriber.transcribe(& f, & b, midi);
	
        return env->NewStringUTF(transcription.c_str());
		
     }
}

extern "C" {
    jstring Java_org_tunepal_Tune_createMidiFile(JNIEnv* env,jobject thiz, jstring pnotation, jstring pABCFileName, jstring pMidiFileName, jint pspeed, jint ptranspose, jint pmelody, jint pchords)
    {
		jboolean isCopy;
        const char * notation = env->GetStringUTFChars(pnotation, & isCopy);
        const char * abcFileName = env->GetStringUTFChars(pABCFileName, & isCopy);
        const char * midiFileName = env->GetStringUTFChars(pMidiFileName, & isCopy);        

        char * result = createMidiFile(notation, abcFileName, midiFileName, pspeed, ptranspose, pmelody, pchords);

        env->ReleaseStringUTFChars(pnotation, notation);
        env->ReleaseStringUTFChars(pABCFileName, abcFileName);
        env->ReleaseStringUTFChars(pMidiFileName, midiFileName);

        return env->NewStringUTF(result);
    }
}
#endif
