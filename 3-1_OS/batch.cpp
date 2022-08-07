#include <iostream>
#include <fstream>
using namespace std;
int main() {
	int N, a = 0, sum = 0, IOTIME=0;

	ifstream fin("batch.inp");
	if (!fin) { cout << "파일을 찾을 수 없음"; return 0; }
	ofstream fout("batch.out");
	if (!fout) { cout << "파일을 열 수 없음"; return 0; }
	
	fin >> N;

	for (int i = 0; i < N; i++) {
		int count = 0;
		//-1은 마지막 입력.
		
		while (true) {
			fin >> a;
			count++;
			if (a == -1) break;
			if (count % 2 == 0) IOTIME += a;
			sum += a;
		}
	}
	// 출력 값. CPU 유휴시간(I/O시간 합), 처리가 종료된 시각(값의 총합)
	//cout << IOTIME << " " << sum;
	fout << IOTIME << " " << sum;

	fin.close(); fout.close();
	return 0;
}