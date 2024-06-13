<?php

namespace App\Http\Controllers;

use App\Models\Palabra;
use Illuminate\Http\Request;

class PalabraController extends Controller
{
    public function index()
    {
        return Palabra::all();
    }

    public function store(Request $request)
    {
        $palabra = new Palabra();
        $palabra->palabra = $request->palabra;
        $palabra->save();
        return response()->json($palabra);
    }

    public function show($id)
    {
        return response()->json(Palabra::find($id));
    }

    public function update(Request $request, Palabra $palabra, $id)
    {
        $palabra = Palabra::find($id);
        $palabra->palabra = $request->palabra;
        $palabra->save();
        return response()->json($palabra);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Palabra  $palabra
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $palabra = Palabra::find($id);
        $palabra->delete();
        return response()->json('Palabra');
    }
}
