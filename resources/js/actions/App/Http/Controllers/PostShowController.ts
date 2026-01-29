import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
export const show = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/blog/{post}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
show.url = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { post: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.slug
                : args.post,
                }

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
show.get = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
show.head = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
    const showForm = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
        showForm.get = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PostShowController::show
 * @see app/Http/Controllers/PostShowController.php:16
 * @route '/blog/{post}'
 */
        showForm.head = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PostShowController::storeComment
 * @see app/Http/Controllers/PostShowController.php:28
 * @route '/blog/{post}/comments'
 */
export const storeComment = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeComment.url(args, options),
    method: 'post',
})

storeComment.definition = {
    methods: ["post"],
    url: '/blog/{post}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PostShowController::storeComment
 * @see app/Http/Controllers/PostShowController.php:28
 * @route '/blog/{post}/comments'
 */
storeComment.url = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { post: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.slug
                : args.post,
                }

    return storeComment.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostShowController::storeComment
 * @see app/Http/Controllers/PostShowController.php:28
 * @route '/blog/{post}/comments'
 */
storeComment.post = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeComment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PostShowController::storeComment
 * @see app/Http/Controllers/PostShowController.php:28
 * @route '/blog/{post}/comments'
 */
    const storeCommentForm = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeComment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PostShowController::storeComment
 * @see app/Http/Controllers/PostShowController.php:28
 * @route '/blog/{post}/comments'
 */
        storeCommentForm.post = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeComment.url(args, options),
            method: 'post',
        })
    
    storeComment.form = storeCommentForm
/**
* @see \App\Http\Controllers\PostShowController::like
 * @see app/Http/Controllers/PostShowController.php:41
 * @route '/blog/{post}/like'
 */
export const like = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

like.definition = {
    methods: ["post"],
    url: '/blog/{post}/like',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PostShowController::like
 * @see app/Http/Controllers/PostShowController.php:41
 * @route '/blog/{post}/like'
 */
like.url = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { post: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        post: typeof args.post === 'object'
                ? args.post.slug
                : args.post,
                }

    return like.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostShowController::like
 * @see app/Http/Controllers/PostShowController.php:41
 * @route '/blog/{post}/like'
 */
like.post = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: like.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PostShowController::like
 * @see app/Http/Controllers/PostShowController.php:41
 * @route '/blog/{post}/like'
 */
    const likeForm = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: like.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PostShowController::like
 * @see app/Http/Controllers/PostShowController.php:41
 * @route '/blog/{post}/like'
 */
        likeForm.post = (args: { post: string | { slug: string } } | [post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: like.url(args, options),
            method: 'post',
        })
    
    like.form = likeForm
const PostShowController = { show, storeComment, like }

export default PostShowController