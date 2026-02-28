export default function getType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

console.log(getType([1,2,3]))
console.log(getType(1))
console.log(getType('3213'))
console.log(getType(function(){}))
console.log(getType(undefined))
console.log(getType(null))
console.log(getType(Symbol(1)))
console.log(getType(123n))


