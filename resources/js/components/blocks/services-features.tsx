import { Code, Database, Camera, Users, Target, Shield, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ServicesFeatures() {
    return (
        <section className="dark:bg-muted/25 bg-zinc-50 py-4 md:py-6">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="mx-auto grid gap-2 sm:grid-cols-5">
                    <Card className="group overflow-hidden shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
                        <CardHeader>
                            <div className="p-4 md:p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Code className="h-4 w-4 text-primary" />
                                    <p className="font-medium text-sm">Web application delivery</p>
                                </div>
                                <p className="text-muted-foreground max-w-xs text-xs">Full-stack builds covering frontend, backend, and infrastructure with Vue.js and Laravel implementations.</p>
                            </div>
                        </CardHeader>

                        <div className="relative h-fit pl-6 md:pl-12">
                            <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_50%_0%,transparent,hsl(var(--background))_100%)]"></div>

                            <div className="bg-background overflow-hidden rounded-tl-lg border-l border-t pl-2 pt-2 dark:bg-zinc-950">
                                <img
                                    src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1207&h=929&fit=crop&crop=entropy&auto=format&q=75"
                                    className="hidden dark:block"
                                    alt="Web development dark illustration"
                                    width={1207}
                                    height={929}
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1207&h=929&fit=crop&crop=entropy&auto=format&q=75"
                                    className="shadow dark:hidden"
                                    alt="Web development light illustration"
                                    width={1207}
                                    height={929}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
                        <div className="flex items-center gap-2 mb-2 justify-center pt-4">
                            <Database className="h-4 w-4 text-primary" />
                            <p className="font-medium text-center text-sm">Systems architecture</p>
                        </div>
                        <p className="mx-auto max-w-sm text-balance px-4 text-center text-base font-semibold md:p-4">Designing resilient platforms for healthcare, finance, and commerce.</p>

                        <CardContent className="mt-auto h-fit">
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                                <div className="aspect-76/59 overflow-hidden rounded-r-lg border">
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1207&h=929&fit=crop&crop=entropy&auto=format&q=75"
                                        className="hidden dark:block"
                                        alt="Architecture dark illustration"
                                        width={1207}
                                        height={929}
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1207&h=929&fit=crop&crop=entropy&auto=format&q=75"
                                        className="shadow dark:hidden"
                                        alt="Architecture light illustration"
                                        width={1207}
                                        height={929}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="group p-4 shadow-black/5 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-6">
                        <div className="flex items-center gap-2 mb-2 justify-center">
                            <Camera className="h-4 w-4 text-primary" />
                            <p className="font-medium text-center text-sm">Professional photography</p>
                        </div>
                        <p className="mx-auto mb-6 max-w-sm text-balance text-center text-base font-semibold">Commercial, event, and portrait photography with editing workflows.</p>

                        <div className="flex justify-center gap-6">
                            <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 relative flex aspect-square size-16 items-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                                <Camera className="size-4" />
                            </div>
                            <div className="inset-shadow-sm dark:inset-shadow-white/5 bg-muted/35 flex aspect-square size-16 items-center justify-center rounded-[7px] border p-3 shadow-lg ring dark:shadow-white/5 dark:ring-black">
                                <Zap className="size-4" />
                            </div>
                        </div>
                    </Card>
                    
                    <Card className="group relative shadow-black/5 sm:col-span-3 sm:rounded-none sm:rounded-br-xl">
                        <CardHeader className="p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-primary" />
                                <p className="font-medium text-sm">Technology consulting</p>
                            </div>
                            <p className="text-muted-foreground mt-1 max-w-xs text-xs">Advisory services for delivery roadmaps and team enablement with workshops and implementation oversight.</p>
                        </CardHeader>
                        <CardContent className="relative h-fit px-4 pb-4 md:px-6 md:pb-6">
                            <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-2">
                                    <Target className="m-auto size-3 text-primary" />
                                </div>
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-2">
                                    <Shield className="m-auto size-3 text-primary" />
                                </div>
                                <div className="rounded-(--radius) aspect-square border border-dashed"></div>
                                <div className="rounded-(--radius) bg-muted/50 flex aspect-square items-center justify-center border p-2">
                                    <Zap className="m-auto size-3 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
