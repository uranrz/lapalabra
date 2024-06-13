<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PalabraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $palabras = [
            'mango', 'tumba', 'lapiz', 'patio', 'guiño', 'calle', 'llave', 'besos', 'trigo', 'nubes', 'horno', 'silla', 'cebra', 'llama',
            'angel', 'lente', 'canto', 'pinta', 'globo', 'arena', 'plomo', 'oveja', 'hongo', 'coche', 'papel', 'torre', 'grano', 'grito', 
            'hacha', 'naran', 'acido', 'orozo', 'luzon', 'raton', 'tonto', 'riojo', 'agape', 'obolo', 'oruga', 'hueso', 'regua', 'exuda', 
            'abeja', 'acebo', 'super', 'heroe', 'humor', 'mezco', 'olafo', 'ovado'
          ];

          foreach ($palabras as $palabra) {
            DB::table('palabras')->insert([
                'palabra' => $palabra
            ]);
        }

    }
}
