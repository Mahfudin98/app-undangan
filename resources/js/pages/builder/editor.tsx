import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    DragOverlay,
    closestCorners,
    type DragOverEvent,
} from '@dnd-kit/core';
import { usePage } from '@inertiajs/react';
import {
    Monitor,
    Redo,
    SendHorizonal,
    Smartphone,
    Tablet,
    Undo,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createNode } from './helpers/blocks';
import { reorderNodes } from './helpers/dnd';
import type { EditorSchema, Invitation } from './helpers/types';
import { duplicateNode, removeNode, reorderArray } from './helpers/utils';
import { useAutoSave } from './hooks/useAutosave';
import { useHistory } from './hooks/useHistory';
import CanvasEditor from './modules/canvas';
import Inspector from './modules/inspector';
import SidebarEditor from './modules/sidebar';
import PreviewRenderer from './preview/previewRender';

type Selection =
    | { type: 'node'; id: string }
    | { type: 'section'; id: string }
    | null;

export default function Editor() {
    const { invitationId, csrf_token } = usePage<{
        invitationId: number;
        csrf_token: string;
    }>().props;

    const { schema, setSchema, undo, redo, canUndo, canRedo, batch } =
        useHistory({
            sections: [{ id: crypto.randomUUID(), children: [] }],
        });

    const [selected, setSelected] = useState<Selection>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [activeDrag, setActiveDrag] = useState<{
        from?: 'sidebar' | 'canvas';
        blockType?: 'text' | 'image';
    } | null>(null);
    const [overId, setOverId] = useState<string | null>(null);
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [invit, setInvit] = useState({} as Invitation);

    /* =======================
       DND SENSOR
    ======================= */
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
    );

    /* =======================
       DRAG END (FINAL)
    ======================= */
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDrag(null);
        if (!over) return;

        const activeData = active.data.current;

        /**
         * 1️⃣ SIDEBAR → CREATE NODE
         */
        if (activeData?.from === 'sidebar') {
            const targetSection = schema.sections.find(
                (s) =>
                    s.id === String(over.id) ||
                    s.children.some((n) => n.id === String(over.id)),
            );
            if (!targetSection) return;

            const insertIndex = targetSection.children.findIndex(
                (n) => n.id === String(over.id),
            );

            const newNode = createNode(activeData.blockType);

            batch(() => {
                setSchema({
                    ...schema,
                    sections: schema.sections.map((s) => {
                        if (s.id !== targetSection.id) return s;

                        const next = [...s.children];
                        if (insertIndex === -1) {
                            next.push(newNode);
                        } else {
                            next.splice(insertIndex, 0, newNode);
                        }

                        return { ...s, children: next };
                    }),
                });
            });
            return;
        }

        // SECTION REORDER
        if (active.data.current?.type === 'section') {
            if (active.id === over.id) return;

            batch(() => {
                setSchema({
                    ...schema,
                    sections: reorderArray(
                        schema.sections,
                        String(active.id),
                        String(over.id),
                    ),
                });
            });
            return;
        }

        /**
         * 2️⃣ NODE → NODE (REORDER / MOVE)
         */
        const sourceSection = schema.sections.find((s) =>
            s.children.some((n) => n.id === String(active.id)),
        );
        const targetSection = schema.sections.find((s) =>
            s.children.some((n) => n.id === String(over.id)),
        );

        if (!sourceSection || !targetSection) return;

        // A. REORDER DALAM SECTION YANG SAMA
        if (sourceSection.id === targetSection.id) {
            if (active.id === over.id) return;

            batch(() => {
                setSchema(
                    reorderNodes(
                        schema,
                        sourceSection.id,
                        String(active.id),
                        String(over.id),
                    ),
                );
            });
            return;
        }

        // B. PINDAH ANTAR SECTION
        batch(() => {
            const movingNode = sourceSection.children.find(
                (n) => n.id === String(active.id),
            )!;
            const targetIndex = targetSection.children.findIndex(
                (n) => n.id === String(over.id),
            );

            setSchema({
                ...schema,
                sections: schema.sections.map((section) => {
                    if (section.id === sourceSection.id) {
                        return {
                            ...section,
                            children: section.children.filter(
                                (n) => n.id !== String(active.id),
                            ),
                        };
                    }

                    if (section.id === targetSection.id) {
                        const next = [...section.children];
                        if (targetIndex === -1) {
                            next.push(movingNode);
                        } else {
                            next.splice(targetIndex, 0, movingNode);
                        }
                        return { ...section, children: next };
                    }

                    return section;
                }),
            });
        });
    };

    const handleDragOver = (event: DragOverEvent) => {
        setOverId(event.over ? String(event.over.id) : null);
    };

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

    /* =======================
       LOAD DATA (ONCE)
    ======================= */
    useEffect(() => {
        const token = localStorage.getItem('editor_token');
        if (!token) return;

        fetch(`/invitation/builder/${invitationId}/data`, {
            headers: { 'X-Editor-Token': token },
        })
            .then((res) => res.json())
            .then((data) => {
                const loaded: EditorSchema = data.schema;
                if (loaded.sections.length === 0) {
                    loaded.sections.push({
                        id: crypto.randomUUID(),
                        children: [],
                    });
                }
                setSchema(loaded);
                setIsHydrated(true);
                setInvit(data.data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationId]);

    /* =======================
       KEYBOARD SHORTCUT
    ======================= */
    useEffect(() => {
        const isTyping = (el: Element | null) =>
            el && ['input', 'textarea'].includes(el.tagName.toLowerCase());

        const onKey = (e: KeyboardEvent) => {
            if (!selected) return;
            if (isTyping(document.activeElement)) return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                batch(() => setSchema(removeNode(schema, selected.id)));
                setSelected(null);
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                batch(() => setSchema(duplicateNode(schema, selected.id)));
            }

            if (e.key === 'Escape') setSelected(null);
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema, selected]);

    useAutoSave(invitationId, schema, isHydrated);

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
                        <Button
                            type="button"
                            onClick={undo}
                            disabled={!canUndo}
                            size={'icon'}
                            variant={'outline'}
                            className={`${!canUndo ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <Undo className="size-5" />
                        </Button>
                        <Button
                            type="button"
                            onClick={redo}
                            disabled={!canRedo}
                            size={'icon'}
                            variant={'outline'}
                            className={`${!canRedo ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <Redo className="size-5" />
                        </Button>
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
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={(e) =>
                    setActiveDrag({
                        from: e.active.data.current?.from,
                        blockType: e.active.data.current?.blockType,
                    })
                }
                onDragEnd={handleDragEnd}
                onDragCancel={() => setActiveDrag(null)}
                onDragOver={handleDragOver}
            >
                <div className="flex h-screen overflow-hidden">
                    <SidebarEditor />
                    {mode === 'edit' ? (
                        <CanvasEditor
                            schema={schema}
                            selected={selected}
                            onSelect={setSelected}
                            overId={overId}
                            batch={batch}
                            setSchema={setSchema}
                        />
                    ) : (
                        <PreviewRenderer schema={schema} />
                    )}
                    <Inspector
                        schema={schema}
                        selected={selected}
                        setSchema={setSchema}
                    />
                </div>

                <DragOverlay>
                    {activeDrag?.from === 'sidebar' && (
                        <div className="rounded border bg-white px-4 py-2 shadow">
                            {activeDrag.blockType}
                        </div>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
