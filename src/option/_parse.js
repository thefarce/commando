
import createOption from './create-option.js';

var opt = createOption('-d, --display, {Enum+}, <color>, [red], The color');

console.log(opt);


