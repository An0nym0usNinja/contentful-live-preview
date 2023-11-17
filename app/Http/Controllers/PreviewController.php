<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PreviewController extends Controller
{
    public function previewPage($entryId)
    {
        return view('preview.page')->with('entryId', $entryId);
    }
}
