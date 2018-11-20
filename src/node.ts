// NODE SHIM for WebDNN
declare var global: any;

global.fetch = require('node-fetch');
const { performance } = require('perf_hooks');
global.performance = performance;

var Worker = require('webworker-threads').Worker;
global.Worker = Worker;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html><head></head><body></body>`, {
  resources: 'usable',
  runScripts: 'dangerously'
});

global.window = window;
global.navigator = {
  appCodeName: 'Mozilla',
  appName: 'Netscape',
  appVersion:
    '5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.36 (KHTML, like Gecko) NodeJS/v0.4.7 Chrome/13.0.767.0 Safari/534.36',
  cookieEnabled: true,
  mimeTypes: [],
  onLine: true,
  platform: 'MacIntel',
  plugins: [],
  product: 'Gecko',
  productSub: '20030107',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.36 (KHTML, like Gecko) NodeJS/v0.4.7 Chrome/13.0.767.0 Safari/534.36',
  vendor: 'Joyent',
  vendorSub: ''
};
global.document = window.document;
global.HTMLImageElement = window.HTMLImageElement;
global.HTMLVideoElement = window.HTMLVideoElement;
global.HTMLCanvasElement = window.HTMLCanvasElement;

import { WebDNNBackend } from './web';
export { WebDNNBackend };
