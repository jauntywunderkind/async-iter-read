"use module"
export async function readAhead( iter, n){
	const
	  reads= [],
	  push= reads.push.bind( reads)
	while( n-- > 0){
		iter.next().then( push)
	}
	return Promise.all( reads)
}
export {
  readAhead as ReadAhead
}
export default readAhead
