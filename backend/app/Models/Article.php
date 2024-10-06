<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // Specify which attributes can be mass assigned
    protected $fillable = [
        'title',        // Title of the article
        'source',       // Source of the article (e.g., newsapi, theguardian)
        'content',      // Content of the article
        'published_at', // Publication date of the article
    ];
}