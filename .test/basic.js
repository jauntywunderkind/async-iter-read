"use module"
import tape from "tape"

import forAwait from "../for-await.js"
import ahead from "../ahead.js"

async function *fixture(){
	yield 1
	yield 2
	yield 3
}

tape( "ahead", async function( t){
	const read= ahead( fixture(), 3)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( r0[ 2], 3, "3 value")
	t.equal( read.complete, 3, "all complete")

	t.end()
})

tape( "for-await", async function( t){
	const read= forAwait( fixture(), 3)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( r0[ 2], 3, "3 value")
	t.equal( read.complete, 3, "all complete")

	t.end()
})

tape( "ahead too many", async function( t){
	const read= ahead( fixture(), 5)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( r0[ 2], 3, "3 value")
	t.equal( r0[ 3], undefined, "no value")
	t.equal( r0[ 4], undefined, "no value")
	t.equal( read.complete, 5, "all complete")
	t.equal( r0.length, 5, "length is ahead count")

	t.end()
})

tape( "for-await too many", async function( t){
	const read= forAwait( fixture(), 5)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( r0[ 2], 3, "3 value")
	t.equal( read.complete, 3, "all complete")
	t.equal( r0.length, 3, "length is read count")

	t.end()
})

tape( "ahead too few", async function( t){
	const read= ahead( fixture(), 2)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( read.complete, 2, "all complete")
	t.equal( r0.length, 2, "length is n")

	t.end()
})

tape( "for-await too few", async function( t){
	const read= forAwait( fixture(), 2)
	t.ok( read instanceof Promise, "read is a promise")
	t.equal( read.complete, 0, "nothing complete")

	const r0= await read
	t.equal( r0[ 0], 1, "1 value")
	t.equal( r0[ 1], 2, "2 value")
	t.equal( read.complete, 2, "all complete")
	t.equal( r0.length, 2, "length is n")

	t.end()
})