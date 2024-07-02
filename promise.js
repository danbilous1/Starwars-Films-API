function foo(){

	let promise = new Promise((res,rej)=>{
		setTimeout(()=>res('ok'), 1000)
	})
	promise.then(data=>console.log(data))
	
	let name = 'John'
	console.log(name)
}

foo()
