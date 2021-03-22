import { Member } from './models';

const API_KEY = 'c0c74eb6-9a33-4832-a2dd-bb6712371159';
const BASE_URL = 'https://hitubadminton.microcms.io/api/v1';

type ResponseMenber = {
  lastName: string;
  firstName: string;
  gender: string[];
  admissionYear: number;
  faculty: string[];
  highschool: string;
  positions?: string;
  oldPositions?: string;
}[];

class MicroCMS {
  constructor(private apiKey: string, private baseUrl: string) {}

  private async get<T>(path: string): Promise<T> {
    const url = BASE_URL + path;
    const res = await fetch(url, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    const resJson = await res.json();
    return resJson.contents;
  }

  async getMember(): Promise<Member[]> {
    const path = '/member?limit=100';
    const res = await this.get<ResponseMenber>(path);
    const editedRes: Member[] = res.map((v) => {
      const gender = v.gender[0].replace('男性', 'm').replace('女性', 'w');
      const faculty = v.faculty[0];
      const positions = v.positions ? v.positions.split(',') : [];
      const oldPositions = v.oldPositions ? v.oldPositions.split(',') : [];
      return {
        ...v,
        ...{
          gender: gender,
          faculty: faculty,
          positions: positions,
          oldPositions: oldPositions,
        },
      };
    });
    return editedRes;
  }

  async getObMessage() {
    const path = '/ob-message?limit=1000';
    const res = await this.get(path);
    return res;
  }
}

export const microCMS = new MicroCMS(API_KEY, BASE_URL);
