
int main(int argc, char *argv[]);

int abc2midiC()
{
	char * params[] = {"", "in.abc", "-o", "out.mid"};
	return main(4, params);
}