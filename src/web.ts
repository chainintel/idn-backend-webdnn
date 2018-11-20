import { Backend } from '@idn/backend';
const WebDNN = require('../lib/webdnn/descriptor_runner/webdnn.ts');

class WebDNNBackend extends Backend {
  constructor(supported_types) {
    super(supported_types);
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
