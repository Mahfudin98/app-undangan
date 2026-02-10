import {
    Monitor,
    Redo,
    SendHorizonal,
    Smartphone,
    Tablet,
    Undo,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Invitation } from '../helpers/types';

type EditorMode = 'edit' | 'preview';

type Props = {
    invitationId: number;
    csrf_token: string;
    invit: Invitation;

    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;

    mode: EditorMode;
    setMode: React.Dispatch<React.SetStateAction<EditorMode>>;
};
export default function EditorHeader({
    invitationId,
    csrf_token,
    invit,
    undo,
    redo,
    canUndo,
    canRedo,
    setMode,
    mode,
}: Props) {
    const publish = async () => {
        try {
            const res = await fetch(`/invitation/${invitationId}/publish`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': `${csrf_token}`,
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                alert('Publish Error');
                return;
            }

            const data = await res.json();
            alert(`Published: ${data.url}`);
            alert('Published');
        } catch (err) {
            console.log(err);
            alert('Unexcepted error');
        }
    };
    return (
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
                    {invit.slug}
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
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    onClick={() => undo()}
                                    disabled={!canUndo}
                                    variant="outline"
                                    size="icon-sm"
                                    className={`${!canUndo ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <Undo className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Undo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    onClick={() => redo()}
                                    disabled={!canRedo}
                                    size={'icon'}
                                    variant={'outline'}
                                    className={`${!canRedo ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <Redo className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Redo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button className="rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                    Save Draft
                </Button>
                <Button
                    onClick={() => publish()}
                    type="button"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
                >
                    Publish
                </Button>
                <Button
                    onClick={() =>
                        setMode(mode === 'edit' ? 'preview' : 'edit')
                    }
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
                >
                    {mode === 'edit' ? 'Preview' : 'Back to Editor'}
                </Button>
                <div
                    className="ml-2 h-8 w-8 rounded-full border border-slate-200 bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuDRkb2H3T1wzOg5BHx_H2oAIK77D23nzPe5mByZ4ycUcJS7y5HmtKULLRsTfqVI10G-A2xh5GkVOMj7paBEqjyaAHqtFsxdbPwt3GWfEHF9qi-xvOAvdaAnZe0ksx_dl2XQGuvFRDLneb69REms5agk6wGXZ1Neif4O-5XY12NZE5LXMrkalyi8ftdskuL_oCpabGA-TfoCtNSSAmsjkaJXDjrVPDyoq_fNAmzynpDyVVfhi97Eu203LLOlOzLNOIPvH4tPu9md5TKg)] bg-cover bg-center dark:border-slate-700"
                    data-alt="User profile avatar circle"
                ></div>
            </div>
        </header>
    );
}
