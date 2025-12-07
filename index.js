
//Base obj
const name={
    name:"pritam",
    age:25
}

function printName(town,state,country){
    console.log(`${this.name}-${this.age}-${town}-${state}-${country}`)
}

//inbuild bind method call
const printMyName=printName.bind(name,"kolkata","wb")
printMyName("India")


//bind polifil method
Function.prototype.myBind=function(...args){
    const fn=this
    const obj=args[0]
    const parameters=args.slice(1)
    return function(...args2){
        fn.apply(obj,[...parameters,...args2])
    }
}
//call polifil
const printMyName2=printName.myBind(name,"kolkata","wb")
printMyName2("India")

