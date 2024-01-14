import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PLATFORM} from 'aurelia-pal';
// import {MyUppercaseValueConverter} from "./value-converter/my-uppercase";

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  aurelia.use.globalResources(PLATFORM.moduleName('value-converter/my-uppercase'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
