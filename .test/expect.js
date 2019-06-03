"use module"
import tape from "tape"

import Expect from "../expect.js"

function *payload(){
	yield*[ 1, 2, 3, 4, 5, 6]
}

tape( "expect but was too-short", async function( t){
	t.plan( 1)
	try{
		await Expect( payload(), [ 1, 2, 3, 4, 5])
		t.fail( "run ran and was not too short")
	}catch(ex){
		t.pass( "expected was too short")
	}
	t.end()
})

tape( "expect but was too-long", async function( t){
	t.plan( 1)
	try{
		await Expect( payload(), [ 1, 2, 3, 4, 5, 6, 42])
		t.fail( "run ran and was not too long")
	}catch( ex){
		t.pass( "expected was too long")
	}
	t.end()
})

tape( "expect just right", async function( t){
	t.plan( 0)
	await Expect( payload(), [ 1, 2, 3, 4, 5, 6])
	t.end()
})
