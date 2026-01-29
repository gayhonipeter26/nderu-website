import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import comments from './comments'
/**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
export const show = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/photography/{session}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
show.url = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
show.get = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
show.head = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
    const showForm = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
        showForm.get = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PhotographyShowController::show
 * @see app/Http/Controllers/PhotographyShowController.php:16
 * @route '/photography/{session}'
 */
        showForm.head = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\PhotographyShowController::like
 * @see app/Http/Controllers/PhotographyShowController.php:45
 * @route '/photography/{session}/like'
 */
export const like = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

like.definition = {
    methods: ["post"],
    url: '/photography/{session}/like',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PhotographyShowController::like
 * @see app/Http/Controllers/PhotographyShowController.php:45
 * @route '/photography/{session}/like'
 */
like.url = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return like.definition.url
            .replace('{session}', parsedArgs.session.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhotographyShowController::like
 * @see app/Http/Controllers/PhotographyShowController.php:45
 * @route '/photography/{session}/like'
 */
like.post = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PhotographyShowController::like
 * @see app/Http/Controllers/PhotographyShowController.php:45
 * @route '/photography/{session}/like'
 */
    const likeForm = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: like.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PhotographyShowController::like
 * @see app/Http/Controllers/PhotographyShowController.php:45
 * @route '/photography/{session}/like'
 */
        likeForm.post = (args: { session: string | { slug: string } } | [session: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: like.url(args, options),
            method: 'post',
        })
    
    like.form = likeForm
const photography = {
    show: Object.assign(show, show),
comments: Object.assign(comments, comments),
like: Object.assign(like, like),
}

export default photography