import { Backend } from '@idn/backend';
const WebDNN = require('../lib/webdnn/descriptor_runner/webdnn.ts');

class WebDNNBackend extends Backend {
  constructor(types) {
    types = types.filter(
      (type) =>
        ['webdnn/webgpu', 'webdnn/webgl', 'webdnn/webassembly', 'webdnn/fallback'].indexOf(type) >=
        0
    );
    if (types.length == 0) {
      throw new Error(
        'please provide an array of types this backend support webdnn/webgpu,webdnn/webgl,webdnn/webassembly,webdnn/fallback'
      );
    }
    super(types);
  }
  async _initFn(model) {
    let modelPath = model.path;
    // run the first type that support
    let type;
    let i = 0;
    while (i < model.types.length) {
      if (this.types.indexOf(model.types[i]) >= 0) {
        type = model.types[i];
        break;
      }
      i = i + 1;
    }
    if (!type) {
      throw 'NO SUPPORTED TYPES AVAILABLE';
    }

    let [_, backend] = type.split('/');
    let runner = await WebDNN.load(`${modelPath}`, {
      backendOrder: backend
    });
    return runner;
  }
  async _inferFn(runner, inputs) {
    let inputviews = runner.getInputViews();
    for (let i = 0; i < inputs.length; i++) {
      inputviews[i].set(inputs[i]);
    }
    await runner.run();
    return runner.getOutputViews().map((o) => o.toActual().slice());
  }
  async _destroyFn(runner, model) {}
}

export { WebDNNBackend };
