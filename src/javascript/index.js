import '../stylesheets/index.scss';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import './components/indelible-landing';
import './components/indelible-page-type';
import './components/indelible-url';
import './scripts/form-page';

setBasePath('/vendors/shoelace');
