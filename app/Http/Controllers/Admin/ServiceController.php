<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $services = Service::orderByDesc('updated_at')->get();

        return Inertia::render('admin/Services/Index', [
            'services' => ServiceResource::collection($services)->resolve(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'summary' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
        ]);

        Service::create($data);

        return redirect()
            ->back()
            ->with('success', 'Service created.');
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'summary' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Published', 'Draft'])],
        ]);

        $service->update($data);

        return redirect()
            ->back()
            ->with('success', 'Service updated.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()
            ->back()
            ->with('success', 'Service removed.');
    }
}
