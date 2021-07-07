import { settings } from 'settings';
import yaml from 'js-yaml';

class MicroCMS {
  public constructor(private baseUrl: string, private apiKey: string) {}

  public async getContent(contentId: string, isRaw = false) {
    const res = await fetch(this.baseUrl + 'content/' + contentId, {
      headers: { 'X-API-KEY': this.apiKey },
    });
    const rawData = (await res.json()).contentBody;
    if (isRaw) {
      return rawData;
    }
    const data = yaml.load(rawData) || {};
    return data;
  }
}

export const microCms = new MicroCMS(
  settings.microCms.baseUrl,
  settings.microCms.apiKey
);
