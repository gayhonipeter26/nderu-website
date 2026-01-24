<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactChannelResource;
use App\Models\ContactChannel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ContactChannelController extends Controller
{
    public function index(Request $request): Response
    {
        $channels = ContactChannel::orderBy('display_order')->get();

        return Inertia::render('admin/Contact/Index', [
            'channels' => ContactChannelResource::collection($channels),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'label' => ['required', 'string', 'max:150'],
            'value' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['mailto', 'tel', 'note', 'link'])],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ]);

        ContactChannel::create($data);

        return redirect()->back()->with('success', 'Contact channel created.');
    }

    public function update(Request $request, ContactChannel $contactChannel): RedirectResponse
    {
        $data = $request->validate([
            'label' => ['required', 'string', 'max:150'],
            'value' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['mailto', 'tel', 'note', 'link'])],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $contactChannel->update($data);

        return redirect()->back()->with('success', 'Contact channel updated.');
    }

    public function destroy(ContactChannel $contactChannel): RedirectResponse
    {
        $contactChannel->delete();

        return redirect()->back()->with('success', 'Contact channel removed.');
    }
}
