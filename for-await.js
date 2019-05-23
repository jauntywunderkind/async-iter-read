"use module"
export function readForAwait( iter, n= Number.POSITIVE_INFINITY){
	const exec= (async function(){
		for await( const val of iter){
			exec.reads.push( val)
			++exec.complete
			if( exec.complete>= n){
				return exec.reads
			}
		}
		return exec.reads
	})()
	exec.complete= 0
	exec.reads= []
	return exec
}
export {
  readForAwait as ReadForAwait
}
export default readForAwait
