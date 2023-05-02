const {Compiler} = require('./index');
const args = process.argv.slice(2);
function getArgValue(argName, defaultValue) {
    const args = process.argv.slice(2);
    const argIndex = args.indexOf(argName);
    if (argIndex !== -1) {
        return args[argIndex + 1];
    } else {
        return defaultValue;
    }
}
const input = getArgValue('--input', './in');
const output = getArgValue('--output', './out');
console.log(`input: ${input}`);
console.log(`output: ${output}`);