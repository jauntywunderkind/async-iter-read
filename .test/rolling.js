"use module"
"use module"
import tape from "tape"

import rolling from "../rolling.js"

async function *fixture(){
	yield 2
	yield 4
	yield 6
}

tape( "rolling one at a time", async function( t){
	const read= rolling( fixture(), 1)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 2, "2-value")
	t.equal( r0[ 1], 4, "4-value")
	t.equal( r0[ 2], 6, "6-value")
	t.equal( read.complete, 3, "complete")
	t.equal( r0.length, 3, "length")
	t.end()
})

tape( "rolling, two up", async function( t){
	const read= rolling( fixture(), 2)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 2, "2-value")
	t.equal( r0[ 1], 4, "4-value")
	t.equal( r0[ 2], 6, "6-value")
	t.equal( read.complete, 3, "complete")
	t.equal( r0.length, 3, "length")
	t.end()
})

tape( "rolling, three up", async function( t){
	const read= rolling( fixture(), 3)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 2, "2-value")
	t.equal( r0[ 1], 4, "4-value")
	t.equal( r0[ 2], 6, "6-value")
	t.equal( read.complete, 3, "complete")
	t.equal( r0.length, 3, "length")
	t.end()
})

tape( "rolling, four up", async function( t){
	const read= rolling( fixture(), 4)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 2, "2-value")
	t.equal( r0[ 1], 4, "4-value")
	t.equal( r0[ 2], 6, "6-value")
	t.equal( read.complete, 3, "complete")
	t.equal( r0.length, 3, "length")
	t.end()
})
