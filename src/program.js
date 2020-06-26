
import createOption from './option/create-option.js';

class Program {

  constructor () {
    this.options = [];
  }

  option (opt) {
    var option = createOption(opt);

    if (option) {
      this.options.push(option);
    }

    return this;
  }

  checkOption (str) {
    for (var i = 0, len = this.options.length; i < len; i++) {
      let opt = this.options[i];

      if (opt.matches(str)) {
        return true;
      }
    }

    return false;
  }

  interp (args) {
    var nodePath   = args.shift();
    var scriptPath = args.shift();

    args.forEach(arg => {

      console.log(arg);
    });

    return {
      pig:'pag'
    }
  }

  run (args=process.argv) {
    console.log(process.argv);
    console.log(this);
  }

}

export default Program;
