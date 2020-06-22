
import Option from './option';

class Program {

  constructor () {
    this.options = [];
  }

  option (opt) {
    this.options.push(new Option(opt));
    return this;
  }

  run (args=process.argv) {
    console.log(this);
  }

}

export default Program;
