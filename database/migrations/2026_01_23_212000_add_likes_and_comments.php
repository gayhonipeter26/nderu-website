<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedInteger('likes_count')->default(0)->after('reading_time');
        });

        Schema::table('photography_sessions', function (Blueprint $table) {
            $table->unsignedInteger('likes_count')->default(0)->after('deliverables_count');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->unsignedInteger('likes_count')->default(0)->after('featured');
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('commentable_type');
            $table->unsignedBigInteger('commentable_id');
            $table->string('author_name');
            $table->string('author_email')->nullable();
            $table->text('body');
            $table->timestamps();

            $table->index(['commentable_type', 'commentable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('likes_count');
        });

        Schema::table('photography_sessions', function (Blueprint $table) {
            $table->dropColumn('likes_count');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('likes_count');
        });
    }
};
