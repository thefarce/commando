# Commando
A node module for creating command line programs easily and intuitively.

## Installation

```
npm install @thefarce/commando
```

## Usage
The **Commando** package is designed to make creating command-line interfaces (CLIs) painless.  It does this by providing sensible default behaviours and allowing simple, expressive declarations.

### A Tiny Demonstration
The following is a fully-functional *Commando* CLI program.

### Simple Programs
A very simple program with little complexity is extremely easy to write. The following is a complete CLI to a script that performs one function.

```javascript
import Program from '@thefarce/commando'
const program = new Program();
program.entry(() => console.log("Hello, World!"));  // The program entry point.
program.run();                                        // Now that the program is defined, run it.
```

Running this program with `node say-hello.js` will print `Hello, World!` to the
console.

```shell
$ node say-hello.js
Hello, World!
```

While this is _slightly_ more complex than a simple script:

```
console.log("Hello, World!");
```

The added indirection makes it extremely easy to enhance your program later
on as you expand its feature-set.  

There are at least three viable patterns when writing programs with `@thefarce/commando`:

  1. command-line arguments (typed!)
  1. git-style subcommands (modular!)
  1. metaprogramming (eh? wot!?)

### Command-Line Arguments
Command-line arguments are supported with an easy, and expressive syntax.  It is designed to be _very_ intuitive to anyone familiar with unix-style command-line interfaces.

Let's take the prior program and adapt it to take an optional _name_ argument and greet that name.

```javascript
import Program from '@thefarce/commando'
const program = new Program();
program.entry((context) => {
  let name = context.program.arguments[0] || 'World';
  console.log(`Hello, ${name}!`)
});
program.run();
```

Notice we added a `context` argument to the entry function.  Before we discuss that, let's look at it's execution with a couple of different examples:

```shell
$ node say-hello.js
Hello, World!
$ node say-hello.js Bob
Hello, Bob!
```

### Command-Line Options
In addition to simple arguments, we can easily and intuitively define command-line _options_.  Options are like arguments, except that they are _unordered_, _predefined_, and _structured_.

#### Unordered
Unlike arguments, which are interpreted by their order of appearance, options are _unordered_, meaning that they can appear in any order without impacting their meaning.

#### Predefined
Arguments are handled by the program as a matter of course.  They are passed into the program through the `context.program.arguments` parameter and the manner of their parsing, interpretation, and handling is defined within the execution of the script.  These can have any value (though not all values may make sense or be handled).

Options, however, are typically denoted with hyphens (`-` or `--`) and may appear anywhere in the argument list.

Some options are accompanied by arguments as well.  For example, to specify a color in your program, you may opt to use a "color" options, like this: `node myprog.js --color red`.  Arguments to options are sometimes called the option's _values_, and the option is said to _take_ those arguments or values.

An option that takes no value is often called a _flag_.  Flags are typically interpreted as boolean values, with their presence being "truthy" and their absence being "falsey."  For example, you may wish for your program to have the ability to run without output to `stdout`.  In this case, you may choose to define a `--silent` flag.  If the flag is _not_ present, stdout receives data.  If the flag _is_ present, the user is opting for the program to run silently.  Inverting this behavior with the `--verbose` flag inverts that logic, defaulting the program to silence, but allowing verbosity.

#### Structured
In `@thefarce/commando`, it's possible to add considerable structure to the program's options, including _type_, _requirement_, _default values_, _value enumerations_, _internal naming_, and a _brief description_.

See the **Options** section for detialed information about this.

#### Examples
Here are a few simple examples of how to define and use options in `@thefarce/commando`.

##### Complete Examples for Each Type
**String option** (very complete)
```javascript
.option('-c --color {String+} <useColor=red> (red|green|blue) [blue] The color of the output')
```
Interpretation guide:
* `-c --color` allows both the "short" style `-c` or the "long" style, `--color`.
* `{String}` interprets all values as strings.  The `+` means multiple occurances are allowed.
* `<useColor=red>` internally represent this with the name `useColor` rather than `color`.  `=red` means use `"red"` as the default value if the option is omitted.
* `(red|green|blue)` allow only these three values.
* `[blue]` Use the default value `"blue"`.  This value overrides the value specified in `<useColor=red>`.
* `The color of the output` the help text associated with this option




##### More Examples
Execution examples:
* `node say-hello.js` (options: `{color: null}`)
* `node say-hello.js -c red` (options: `{color: "red"}`)
* `node say-hello.js --color red` (options: `{color: "red"}`)
* `node say-hello.js --color 123` ((options: `{color: "123"}`)
* `node say-hello.js --color` (options: `{color: null}`)



**An example flag with little definition**
`.option('-c --color')`
* `node say-hello.js` (options: `{color: false}`)
* `node say-hello.js -c` (options: `{color: true}`)
* `node say-hello.js --color` (options: `{color: true}`)

**Specifying a value type**
`.option('-c --color {String}')`
* `node say-hello.js` (options: `{color: null}`)
* `node say-hello.js -c red` (options: `{color: "red"}`)
* `node say-hello.js --color red` (options: `{color: "red"}`)
* `node say-hello.js --color 123` ((options: `{color: "123"}`)
* `node say-hello.js --color` (options: `{color: null}`)

### An example with command-line options

```javascript
import Command from "@thefarce/commando"
const program = new Command();
program
    .option("-c --caps")
    .entry((context) => {
        let output = `Hello, {context.program.arguments[0] || "World"}!`;
        if (context.options.caps) {
            output = output.toUpperCase();
        }
        console.log(output);
    })
    .run()
```









