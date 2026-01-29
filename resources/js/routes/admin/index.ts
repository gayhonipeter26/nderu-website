import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import blog from './blog'
import contact from './contact'
import faqs from './faqs'
import photography from './photography'
import projects from './projects'
import services from './services'
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
services: Object.assign(services, services),
projects: Object.assign(projects, projects),
blog: Object.assign(blog, blog),
photography: Object.assign(photography, photography),
faqs: Object.assign(faqs, faqs),
contact: Object.assign(contact, contact),
}

export default admin