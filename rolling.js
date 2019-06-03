"use module"

export function rolling( iter, credit= 8){
	const reads= []
	async function readNext( pos= 0){
		// claim credit
		--all.credit

		// get next
		const val= iter.next()

		// start next next?
		let next= all.credit<= 0? null: readNext( pos+ 1)

		// wait for val
		let cur= val
		if( cur&& cur.then){
			cur= await cur
		}

		// done fetching this, restore credit
		++all.credit

		// read value
		if( cur&& cur.done=== false){
			reads[ pos]= cur.value
			++all.complete
		// read finish
		}else if( cur&& cur.done=== true){
			return next
		}
		// get next
		next= next|| (all.credit<= 0? null: readNext( pos+ 1))
		return next
	}
	const all= Promise
		.resolve()
		.then( readNext)
		.then(()=> Promise.all( reads))
	all.complete= 0
	all.reads= reads
	all.credit= credit
	return all
}
export {
  rolling as Rolling
}
export default rolling
