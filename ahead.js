"use module"
function extractValue( o){
	return o.value
}

export function readAhead( iter, n){
	const reads= []
	while( n-- > 0){
		let val= iter.next()
		if( val.then){
			val= val.then( extractValue)
		}
		reads.push( val)
	}
	const all= Promise.all( reads)
	all.complete= 0
	all.reads= reads
	function inc(){
		++all.complete
	}
	for( const read of reads){
		read.then( inc)
	}
	return all
}
export {
  readAhead as ReadAhead
}
export default readAhead
