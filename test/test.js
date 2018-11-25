'use strict';
var expect = require('chai').expect;
const { WebDNNBackend } = require('../dist/index.js');
const { fromBuffer, toBuffer } = require('@idn/util-buffer');

describe('WebDNNBackend', () => {
  it('should run fallback', async () => {
    var backend = new WebDNNBackend(['webdnn/fallback']);
    let runner = await backend.init({
      types: ['webdnn/fallback'],
      path: 'https://cloudflare-ipfs.com/ipfs/QmUUv2JEe9kiK4QtTmyqs87V1a1m3ABAQkyjYfJfGRXMri'
    });
    let result = await runner.infer([toBuffer(new Float32Array(784))]);
    console.log(result);
    // expect(result).to.equal('Boys');
  }).timeout(60000);
});
