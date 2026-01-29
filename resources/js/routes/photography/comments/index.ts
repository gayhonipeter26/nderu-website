import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PhotographyShowController::store
 * @see app/Http/Controllers/PhotographyShowController.php:30
 * @route '/photography/{session}/comments'
 */
export const store = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/photography/{session}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PhotographyShowController::store
 * @see app/Http/Controllers/PhotographyShowController.php:30
 * @route '/photography/{session}/comments'
 */
store.url = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { session: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { session: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    session: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        session: typeof args.session === 'object'
                ? args.session.slug
                : args.session,
                }

    return store.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotographyShowController::store
 * @see app/Http/Controllers/PhotographyShowController.php:30
 * @route '/photography/{session}/comments'
 */
store.post = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PhotographyShowController::store
 * @see app/Http/Controllers/PhotographyShowController.php:30
 * @route '/photography/{session}/comments'
 */
    const storeForm = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PhotographyShowController::store
 * @see app/Http/Controllers/PhotographyShowController.php:30
 * @route '/photography/{session}/comments'
 */
        storeForm.post = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const comments = {
    store: Object.assign(store, store),
}

export default comments