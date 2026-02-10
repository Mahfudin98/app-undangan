import { useDraggable } from '@dnd-kit/core';
import {
    History,
    Layers2,
    MapPin,
    Minus,
    MousePointerClick,
    PlayCircle,
    Search,
    Settings,
    Space,
    Text,
} from 'lucide-react';
import HeadingText from '../components/headingText';
import ImageWidget from '../components/imageWidget';
import type { BlockType } from '../helpers/blocks';

function DraggableBlock({ type }: { type: BlockType }) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `block-${type}`,
        data: {
            from: 'sidebar',
            blockType: type,
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="cursor-grab"
        >
            <HeadingText show={type === 'text'} />
            <ImageWidget show={type === 'image'} />
        </div>
    );
}

export default function SidebarEditor() {
    return (
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
                    <DraggableBlock type="text" />
                    {/* <!-- Image Widget --> */}
                    <DraggableBlock type="image" />

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
                            <p className="text-sm font-medium">Layers</p>
                        </div>
                        <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                            <Settings className="size-5 text-xl" />
                            <p className="text-sm font-medium">Settings</p>
                        </div>
                        <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                            <History className="size-5 text-xl" />
                            <p className="text-sm font-medium">History</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
