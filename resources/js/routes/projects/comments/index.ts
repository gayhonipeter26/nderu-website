import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectShowController::store
 * @see app/Http/Controllers/ProjectShowController.php:30
 * @route '/projects/{project}/comments'
 */
export const store = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/projects/{project}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectShowController::store
 * @see app/Http/Controllers/ProjectShowController.php:30
 * @route '/projects/{project}/comments'
 */
store.url = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { project: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.slug
                : args.project,
                }

    return store.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectShowController::store
 * @see app/Http/Controllers/ProjectShowController.php:30
 * @route '/projects/{project}/comments'
 */
store.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectShowController::store
 * @see app/Http/Controllers/ProjectShowController.php:30
 * @route '/projects/{project}/comments'
 */
    const storeForm = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectShowController::store
 * @see app/Http/Controllers/ProjectShowController.php:30
 * @route '/projects/{project}/comments'
 */
        storeForm.post = (args: { project: string | { slug: string } } | [project: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const comments = {
    store: Object.assign(store, store),
}

export default comments