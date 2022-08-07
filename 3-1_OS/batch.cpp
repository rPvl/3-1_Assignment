#include <iostream>
#include <fstream>
using namespace std;
int main() {
	int N, a = 0, sum = 0, IOTIME=0;

	ifstream fin("batch.inp");
	if (!fin) { cout << "������ ã�� �� ����"; return 0; }
	ofstream fout("batch.out");
	if (!fout) { cout << "������ �� �� ����"; return 0; }
	
	fin >> N;

	for (int i = 0; i < N; i++) {
		int count = 0;
		//-1�� ������ �Է�.
		
		while (true) {
			fin >> a;
			count++;
			if (a == -1) break;
			if (count % 2 == 0) IOTIME += a;
			sum += a;
		}
	}
	// ��� ��. CPU ���޽ð�(I/O�ð� ��), ó���� ����� �ð�(���� ����)
	//cout << IOTIME << " " << sum;
	fout << IOTIME << " " << sum;

	fin.close(); fout.close();
	return 0;
}