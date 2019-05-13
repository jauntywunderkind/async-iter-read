"use module"
export async function readForAwait( iter){
	const reads= []
	for await( const val of iter){
		reads.push( val)
	}
	return reads
}
export {
  readForAwait as ReadForAwait
}
export default readForAwait
