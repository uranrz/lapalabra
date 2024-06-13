<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;

class RecordController extends Controller
{
    public function index()
    {
        return Record::all();
    }

    public function store(Request $request)
    {
        $record = new Record();
        $record->player_name = $request->input('player_name');
        $record->difficulty = $request->input('difficulty');
        $record->time = $request->input('time');
        $record->save();

        return response()->json($record, 201);
    }

    public function show($id)
    {
        return Record::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $record = Record::findOrFail($id);
        $record->player_name = $request->input('player_name');
        $record->difficulty = $request->input('difficulty');
        $record->time = $request->input('time');
        $record->save();

        return response()->json($record, 200);
    }

    public function destroy($id)
    {
        $record = Record::findOrFail($id);
        $record->delete();

        return response()->json(null, 204);
    }
}