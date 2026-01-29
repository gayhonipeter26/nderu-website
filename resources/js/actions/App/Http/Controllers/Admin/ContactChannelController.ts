import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ContactChannelController::index
 * @see app/Http/Controllers/Admin/ContactChannelController.php:16
 * @route '/admin/contact'
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
* @see \App\Http\Controllers\Admin\ContactChannelController::store
 * @see app/Http/Controllers/Admin/ContactChannelController.php:25
 * @route '/admin/contact'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::store
 * @see app/Http/Controllers/Admin/ContactChannelController.php:25
 * @route '/admin/contact'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::store
 * @see app/Http/Controllers/Admin/ContactChannelController.php:25
 * @route '/admin/contact'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ContactChannelController::store
 * @see app/Http/Controllers/Admin/ContactChannelController.php:25
 * @route '/admin/contact'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactChannelController::store
 * @see app/Http/Controllers/Admin/ContactChannelController.php:25
 * @route '/admin/contact'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
export const update = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/contact/{contact}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
update.url = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    contact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contact: args.contact,
                }

    return update.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
update.put = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
update.patch = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
    const updateForm = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
        updateForm.put = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ContactChannelController::update
 * @see app/Http/Controllers/Admin/ContactChannelController.php:40
 * @route '/admin/contact/{contact}'
 */
        updateForm.patch = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ContactChannelController::destroy
 * @see app/Http/Controllers/Admin/ContactChannelController.php:55
 * @route '/admin/contact/{contact}'
 */
export const destroy = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/contact/{contact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::destroy
 * @see app/Http/Controllers/Admin/ContactChannelController.php:55
 * @route '/admin/contact/{contact}'
 */
destroy.url = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    contact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contact: args.contact,
                }

    return destroy.definition.url
            .replace('{contact}', parsedArgs.contact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactChannelController::destroy
 * @see app/Http/Controllers/Admin/ContactChannelController.php:55
 * @route '/admin/contact/{contact}'
 */
destroy.delete = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContactChannelController::destroy
 * @see app/Http/Controllers/Admin/ContactChannelController.php:55
 * @route '/admin/contact/{contact}'
 */
    const destroyForm = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactChannelController::destroy
 * @see app/Http/Controllers/Admin/ContactChannelController.php:55
 * @route '/admin/contact/{contact}'
 */
        destroyForm.delete = (args: { contact: string | number } | [contact: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ContactChannelController = { index, store, update, destroy }

export default ContactChannelController