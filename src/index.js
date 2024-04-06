import {
    onCLS,
    onFID,
    onLCP,
} from 'https://unpkg.com/web-vitals@3/dist/web-vitals.js?module';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
