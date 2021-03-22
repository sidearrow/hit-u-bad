import { settings } from '../settings';

export const GTAG_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${settings.gtagId}');
`;

export const pageview = (path: string): void => {
  window.gtag('config', settings.gtagId, { page_path: path });
};
