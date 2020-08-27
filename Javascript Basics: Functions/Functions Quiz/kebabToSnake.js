// simple script to change a kebab word to a snake case.
// ie change '-' to '_'

function kebabToSnake(str) {
    return str.replace(/-/g, "_");
}

console.log(kebabToSnake("hello-world"));
console.log(kebabToSnake("dogs-are-awesome"));
console.log(kebabToSnake("blah"));