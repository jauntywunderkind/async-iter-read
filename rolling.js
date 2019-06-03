"use module"

export function rolling( iter, credit= 8){
	async function readNext( pos= 0){
		if( all.credit<= 0){
			return
		}

		// claim credit
		--all.credit

		// get value
		let cur= iter.next()

		// start next if there's credit
		let next= all.credit<= 0? null: readNext( pos+ 1)

		// wait for value to resolve
		if( cur&& cur.then){
			cur= await cur
		}

		// done fetching this, restore credit
		++all.credit

		// read resolved value
		if( cur&& cur.done=== false){
			all.reads[ pos]= cur.value
			++all.complete
		// read finish
		}else if( cur&& cur.done=== true){
			return next
		}
		// read next if credit to read more & not done
		next= next|| (all.credit<= 0? null: readNext( pos+ 1))
		return next
	}
	// we need `all` to be initialized before readNext runs, so create now
	const all= Promise.resolve()
		// then iterate until done
		.then( readNext)
		// then all is resolved
		.then(()=> all.reads)
	all.complete= 0 // completed reads
	all.credit= credit // instantaneous credits. usually 0 when running, `credits` when done.
	all.credits= credit // total credits. reference value.
	all.reads= [] // read in values
	return all
}
export {
  rolling as Rolling
}
export default rolling
