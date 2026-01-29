import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/photography',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::index
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:18
 * @route '/admin/photography'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::store
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:27
 * @route '/admin/photography'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/photography',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::store
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:27
 * @route '/admin/photography'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::store
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:27
 * @route '/admin/photography'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::store
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:27
 * @route '/admin/photography'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::store
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:27
 * @route '/admin/photography'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
export const update = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/photography/{photography}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
update.url = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { photography: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    photography: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        photography: args.photography,
                }

    return update.definition.url
            .replace('{photography}', parsedArgs.photography.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
update.put = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
update.patch = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
    const updateForm = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
        updateForm.put = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::update
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:70
 * @route '/admin/photography/{photography}'
 */
        updateForm.patch = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::destroy
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:121
 * @route '/admin/photography/{photography}'
 */
export const destroy = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/photography/{photography}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::destroy
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:121
 * @route '/admin/photography/{photography}'
 */
destroy.url = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { photography: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    photography: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        photography: args.photography,
                }

    return destroy.definition.url
            .replace('{photography}', parsedArgs.photography.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PhotographySessionController::destroy
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:121
 * @route '/admin/photography/{photography}'
 */
destroy.delete = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::destroy
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:121
 * @route '/admin/photography/{photography}'
 */
    const destroyForm = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PhotographySessionController::destroy
 * @see app/Http/Controllers/Admin/PhotographySessionController.php:121
 * @route '/admin/photography/{photography}'
 */
        destroyForm.delete = (args: { photography: string | number } | [photography: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const photography = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default photography