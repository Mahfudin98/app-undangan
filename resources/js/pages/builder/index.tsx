import {
    Eye,
    GalleryHorizontal,
    Gauge,
    GripVertical,
    Heading,
    History,
    Image,
    Layers2,
    MapPin,
    Minus,
    Monitor,
    MousePointerClick,
    Pencil,
    PlayCircle,
    PlusCircle,
    Redo,
    Rows2,
    Search,
    SendHorizonal,
    Server,
    Settings,
    ShieldHalf,
    Shrink,
    Smartphone,
    Space,
    Sparkles,
    Tablet,
    Text,
    Trash2,
    Undo,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Builder() {
    return (
        <div className="font-display flex h-screen flex-col overflow-hidden bg-background text-slate-900 antialiased dark:text-slate-100">
            <header className="z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-background px-4 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                        <SendHorizonal className="size-5 text-xl" />
                    </div>
                    <h2 className="text-lg leading-tight font-bold tracking-tight text-slate-900 dark:text-white">
                        WebBuilder Pro
                    </h2>
                    <div className="mx-2 h-6 w-px bg-slate-200 dark:border-slate-800"></div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        My Portfolio Project
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                        <button className="flex items-center justify-center rounded-md p-2 text-primary shadow-sm dark:bg-slate-700">
                            <Monitor className="size-5 text-lg" />
                        </button>
                        <button className="flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-primary dark:text-slate-400">
                            <Tablet className="size-5 text-lg" />
                        </button>
                        <button className="flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-primary dark:text-slate-400">
                            <Smartphone className="size-5 text-lg" />
                        </button>
                    </div>
                    <div className="flex items-center gap-1 border-l border-slate-200 pl-4 dark:border-slate-800">
                        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                            <Undo className="size-5" />
                        </button>
                        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                            <Redo className="size-5" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                        Save Draft
                    </Button>
                    <Button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90">
                        Publish
                    </Button>
                    <div
                        className="ml-2 h-8 w-8 rounded-full border border-slate-200 bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuDRkb2H3T1wzOg5BHx_H2oAIK77D23nzPe5mByZ4ycUcJS7y5HmtKULLRsTfqVI10G-A2xh5GkVOMj7paBEqjyaAHqtFsxdbPwt3GWfEHF9qi-xvOAvdaAnZe0ksx_dl2XQGuvFRDLneb69REms5agk6wGXZ1Neif4O-5XY12NZE5LXMrkalyi8ftdskuL_oCpabGA-TfoCtNSSAmsjkaJXDjrVPDyoq_fNAmzynpDyVVfhi97Eu203LLOlOzLNOIPvH4tPu9md5TKg)] bg-cover bg-center dark:border-slate-700"
                        data-alt="User profile avatar circle"
                    ></div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="flex w-80 flex-col overflow-y-auto border-r border-slate-200 bg-background dark:border-slate-800">
                    <div className="flex flex-col gap-6 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-base font-bold text-slate-900 dark:text-white">
                                    Widgets
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Drag elements to canvas
                                </p>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <Search className="size-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {/* <!-- Heading Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <Heading className="size-6 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Heading
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Add a title
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Image Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <Image className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Image
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Upload photo
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Button Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <MousePointerClick className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Button
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Action link
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Video Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <PlayCircle className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Video
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Embed player
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Text Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <Text className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Text Editor
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Body content
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Divider Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <Minus className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Divider
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Separator
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Spacer Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <Space className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Spacer
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Blank space
                                    </p>
                                </div>
                            </div>
                            {/* <!-- Map Widget --> */}
                            <div className="flex cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50">
                                <MapPin className="size-5 text-primary" />
                                <div className="flex flex-col">
                                    <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                                        Maps
                                    </h2>
                                    <p className="text-[10px] text-slate-500">
                                        Location
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-slate-200 pt-6 dark:border-slate-800">
                            <h3 className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                Structure
                            </h3>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
                                    <Layers2 className="size-5 text-xl" />
                                    <p className="text-sm font-medium">
                                        Layers
                                    </p>
                                </div>
                                <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                                    <Settings className="size-5 text-xl" />
                                    <p className="text-sm font-medium">
                                        Settings
                                    </p>
                                </div>
                                <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                                    <History className="size-5 text-xl" />
                                    <p className="text-sm font-medium">
                                        History
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* <!-- Main Canvas Area --> */}
                <main className="flex flex-1 flex-col items-center overflow-y-auto bg-slate-100 p-8 dark:bg-slate-950">
                    {/* <!-- Floating Toolbar (Active element context) --> */}
                    <div className="mb-4 flex w-full max-w-4xl animate-in justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xl fade-in slide-in-from-top-4 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex gap-1">
                            <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                                <Shrink className="size-5 text-xl" />
                            </button>
                            <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                                <Pencil className="size-5 text-xl" />
                            </button>
                            <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                                <GripVertical className="size-5 text-xl" />
                            </button>
                            <div className="mx-1 h-6 w-px self-center bg-slate-200 dark:bg-slate-800"></div>
                            <button className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <Trash2 className="size-5 text-xl" />
                            </button>
                        </div>
                        <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-white transition-all hover:bg-primary/90">
                            <Settings className="size-5 text-lg" />
                            <span>Edit Hero Section</span>
                        </button>
                    </div>
                    {/* <!-- Website Canvas Section --> */}
                    <div className="relative min-h-[800px] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-slate-900">
                        {/* <!-- Active Hero Element (Simulated Canvas Editing) --> */}
                        <div className="group canvas-outline relative">
                            {/* <!-- Edit Handles --> */}
                            <div className="handle -top-1 -left-1"></div>
                            <div className="handle -top-1 -right-1"></div>
                            <div className="handle -bottom-1 -left-1"></div>
                            <div className="handle -right-1 -bottom-1"></div>
                            <div className="handle -top-1 left-1/2 -translate-x-1/2"></div>
                            <div className="handle -bottom-1 left-1/2 -translate-x-1/2"></div>
                            <div className="handle top-1/2 -left-1 -translate-y-1/2"></div>
                            <div className="handle top-1/2 -right-1 -translate-y-1/2"></div>
                            {/* <!-- Hero Section Content --> */}
                            <div
                                className="from-[rgba(0, 0, 0, 0.4)] to-[rgba(0, 0, 0, 0.7)] @container flex min-h-[480px] flex-col items-center justify-center gap-6 bg-linear-to-r bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuC_BrLm13k56_dheKcMZDePriTPaTrhOB_PDradShUEVrxmjWPk1POtuN1FytncVVPzorX5uuvTi58fc13fvvL1v0xzDDkaNWnn4ISi9x6zhlAXXN21fJm1s4ikltFwd5WY-0FVFBjO4YaGCFsH88iWiu79bEhTTmKvBWvrsZDeisdsbCfIAPuex1XaqlMe0BvqdL9N1rmnhawn2RLQVRYFslFTFBabDKPFry-BoTsxYoBXayhroWtNTmgxcruQCNZsNrxlf63SQx-l)] bg-cover bg-center bg-no-repeat p-8"
                                data-alt="Modern professional office space with blurred background"
                            >
                                <div className="flex max-w-2xl flex-col gap-4 text-center">
                                    <h1 className="text-4xl leading-tight font-black tracking-tight text-white @[480px]:text-6xl">
                                        Your Dream Website Starts Here
                                    </h1>
                                    <h2 className="text-lg leading-relaxed font-normal text-white/80 @[480px]:text-xl">
                                        Easily build professional websites with
                                        our drag-and-drop editor. No coding
                                        required. Start your journey today with
                                        a single click.
                                    </h2>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <button className="flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105">
                                        Get Started Now
                                    </button>
                                    <button className="flex h-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Spacer --> */}
                        <div className="group flex h-20 cursor-pointer items-center justify-center border-b border-dashed border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                            <div className="hidden items-center gap-2 text-slate-400 group-hover:flex">
                                <PlusCircle className="size-5" />
                                <span className="text-sm font-medium">
                                    Add Section
                                </span>
                            </div>
                        </div>
                        {/* <!-- Content Grid Mockup --> */}
                        <div className="grid grid-cols-3 gap-8 p-12">
                            <div className="flex flex-col gap-4">
                                <div
                                    className="flex h-48 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800"
                                    data-alt="Abstract placeholder for feature one"
                                >
                                    <Gauge className="size-12 text-4xl text-slate-300 dark:text-slate-700" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white">
                                    Lightning Fast
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-500">
                                    Optimized for speed and performance out of
                                    the box with zero configuration needed.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div
                                    className="flex h-48 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800"
                                    data-alt="Abstract placeholder for feature two"
                                >
                                    <ShieldHalf className="size-12 text-4xl text-slate-300 dark:text-slate-700" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white">
                                    Secure by Default
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-500">
                                    Enterprise-grade security features built
                                    into every component of your new website.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div
                                    className="flex h-48 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800"
                                    data-alt="Abstract placeholder for feature three"
                                >
                                    <Sparkles className="size-12 text-4xl text-slate-300 dark:text-slate-700" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white">
                                    SEO Optimized
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-500">
                                    Reach your audience faster with automated
                                    SEO tools and clean metadata generation.
                                </p>
                            </div>
                        </div>
                        {/* <!-- Canvas Labels --> */}
                        <div className="absolute top-4 left-4 rounded bg-primary/20 px-2 py-1 text-[10px] font-bold tracking-wider text-primary uppercase backdrop-blur-sm">
                            Hero Section #01
                        </div>
                    </div>
                    {/* <!-- Footer indicator --> */}
                    <div className="mt-8 flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <Eye className="size-3 text-sm" />
                            Last saved: 2 mins ago
                        </span>
                        <span className="flex items-center gap-1">
                            <Server className="size-3 text-sm" />
                            45.2 MB / 500 MB used
                        </span>
                    </div>
                </main>
                {/* <!-- Contextual Sidebar (Right - Optional Property Panel) --> */}
                <aside className="flex hidden w-72 flex-col overflow-y-auto border-l border-slate-200 bg-background p-4 xl:flex dark:border-slate-800">
                    <h3 className="mb-6 text-sm font-bold text-slate-900 dark:text-white">
                        Styles
                    </h3>
                    <div className="flex flex-col gap-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                Layout
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="flex flex-col items-center gap-1 rounded-lg border-2 border-primary bg-primary/5 p-2 text-primary">
                                    <Rows2 className="size-5" />
                                    <span className="text-[10px] font-medium">
                                        Full Width
                                    </span>
                                </button>
                                <button className="flex flex-col items-center gap-1 rounded-lg border-2 border-slate-100 p-2 text-slate-400 dark:border-slate-800">
                                    <GalleryHorizontal className="size-5" />
                                    <span className="text-[10px] font-medium">
                                        Boxed
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                Background
                            </label>
                            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded bg-linear-to-tr from-primary to-blue-400"></div>
                                    <span className="text-xs font-medium dark:text-white">
                                        Image / Overlay
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-sm text-slate-400">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                Typography
                            </label>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between p-2">
                                    <span className="text-xs text-slate-500">
                                        Size
                                    </span>
                                    <span className="text-xs font-bold dark:text-white">
                                        64px
                                    </span>
                                </div>
                                <div className="relative h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                                    <div className="absolute top-0 left-0 h-full w-2/3 rounded-full bg-primary"></div>
                                    <div className="absolute top-1/2 left-2/3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="w-full rounded-lg bg-slate-900 py-2 text-xs font-bold text-white transition-all hover:opacity-90 dark:bg-white dark:text-black">
                                Advanced Settings
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
