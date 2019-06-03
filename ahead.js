"use module"
function extractValue( o){
	return o&& o.value!== undefined|| o.done!== undefined? o.value: o
}

export function readAhead( iter, n){
	const reads= []
	while( n-- > 0){
		let val= iter.next()
		if( val.then){
			val= val.then( extractValue)
		}else{
			val= extractValue( val)
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
		if( read&& read.then){
			read.then( inc)
		}else{
			inc()
		}
	}
	return all
}
export {
  readAhead as ReadAhead
}
export default readAhead
