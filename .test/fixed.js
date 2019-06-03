"use module"
import tape from "tape"

import fixed from "../fixed.js"

async function *fixture(){
	yield 1
	yield 2
	yield 3
}

tape( "fixed", async function( t){
	const read= fixed( fixture(), 3)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( r0[ 2], 3, "3 value")
	t.equal( read.complete, 3, "all complete")

	t.end()
})

tape( "fixed too many", async function( t){
	const read= fixed( fixture(), 5)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( r0[ 2], 3, "3 value")
	t.equal( r0[ 3], undefined, "no value")
	t.equal( r0[ 4], undefined, "no value")
	t.equal( read.complete, 5, "all complete")
	t.equal( r0.length, 5, "length is fixed count")

	t.end()
})

tape( "fixed too few", async function( t){
	const read= fixed( fixture(), 2)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( read.complete, 2, "all complete")
	t.equal( r0.length, 2, "length is n")

	t.end()
})
