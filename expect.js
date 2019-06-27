"use module"
import forAwait from "./for-await.js"

export function assertEqualOrThrow( a, b, msg){
	if( a!== b){
		throw new Error( msg)
	}
}

export async function expect( iter, expected, assert= assertEqualOrThrow, msg= "expect eqal"){
	const
	  expected2= await forAwait( expected),
	  found= await forAwait( iter)

	assert( found.length, expected2.length, msg)
	for( let i= 0; i< expected2.length; ++i){
		assert( found[ i], expected[ i], msg)
	}
}
export {
  expect as default,
  expect as Expect,
  expect as readExpect,
  expect as ReadExpect,
  expect as asyncIterReadExpect,
  expect as AsyncIterReadExpect
}
