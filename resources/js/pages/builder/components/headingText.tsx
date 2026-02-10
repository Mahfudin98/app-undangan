import { Heading } from 'lucide-react';

export default function HeadingText({ show }: { show: boolean }) {
    return (
        <div
            className={`${show ? 'flex' : 'hidden'} cursor-grab flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900/50`}
        >
            <Heading className="size-6 text-primary" />
            <div className="flex flex-col">
                <h2 className="text-xs leading-tight font-bold text-slate-900 dark:text-white">
                    Heading
                </h2>
                <p className="text-[10px] text-slate-500">Add a title</p>
            </div>
        </div>
    );
}
