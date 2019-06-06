"use module"
export function forAwait( iter, n= Number.POSITIVE_INFINITY){
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
  forAwait as default,
  forAwait as ForAwait,
  forAwait as readForAwait,
  forAwait as ReadForAwait,
  forAwait as asyncIterReadForAwait,
  forAwait as AsyncIterReadForAwait
}
