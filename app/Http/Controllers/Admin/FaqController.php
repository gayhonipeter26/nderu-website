<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(Request $request): Response
    {
        $faqs = Faq::orderByDesc('updated_at')->get();

        return Inertia::render('admin/Faqs/Index', [
            'faqs' => FaqResource::collection($faqs),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
        ]);

        Faq::create($data);

        return redirect()->back()->with('success', 'FAQ created.');
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $data = $request->validate([
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
        ]);

        $faq->update($data);

        return redirect()->back()->with('success', 'FAQ updated.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()->back()->with('success', 'FAQ removed.');
    }
}
