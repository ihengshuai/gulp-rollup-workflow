import date from "./app"
const a:Date = date;
console.log(a);


const arr:Array<number> = [1,2 ,3]
console.log(arr)

interface AppFace {
	(x:number, y?:number): Promise<Boolean>
}
let app:AppFace
function hello() {
	return 1
}

function Hello(params) {
	console.log(params);
}
app = async (x, y = 1) => {
	await console.log(2)
	return x > y
}
const flag = app(2)
console.log(flag);


@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
function sealed(constructor: Function) {
	Object.seal(constructor);
	Object.seal(constructor.prototype);
}
