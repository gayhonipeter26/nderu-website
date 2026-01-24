<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('photography_sessions', function (Blueprint $table) {
            $table->string('hero_image_path')->nullable()->after('summary');
            $table->string('highlight_video_path')->nullable()->after('hero_image_path');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->string('cover_image_path')->nullable()->after('summary');
            $table->string('feature_video_path')->nullable()->after('cover_image_path');
        });
    }

    public function down(): void
    {
        Schema::table('photography_sessions', function (Blueprint $table) {
            $table->dropColumn(['hero_image_path', 'highlight_video_path']);
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['cover_image_path', 'feature_video_path']);
        });
    }
};
