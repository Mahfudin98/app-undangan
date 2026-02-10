import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import EditorHeader from './components/editorHeader';
import type { Invitation, Selection } from './helpers/types';
import { useAutoSave } from './hooks/useAutosave';
import { useEditorDnd } from './hooks/useEditorDnd';
import { useEditorKeyboard } from './hooks/useEditorKeyboard';
import { useEditorLoader } from './hooks/useEditorLoader';
import { useHistory } from './hooks/useHistory';
import CanvasEditor from './modules/canvas';
import Inspector from './modules/inspector';
import SidebarEditor from './modules/sidebar';
import PreviewRenderer from './preview/previewRender';

export default function Builder() {
    const { invitationId, csrf_token } = usePage<{
        invitationId: number;
        csrf_token: string;
    }>().props;

    const { schema, setSchema, undo, redo, canUndo, canRedo, batch } =
        useHistory({
            sections: [{ id: crypto.randomUUID(), children: [] }],
        });

    const [selected, setSelected] = useState<Selection>(null);
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [invit, setInvit] = useState({} as Invitation);

    const {
        sensors,
        activeDrag,
        handleDragEnd,
        handleDragOver,
        overId,
        setActiveDrag,
    } = useEditorDnd(schema, setSchema, batch);

    useEditorLoader(invitationId, setSchema, setInvit);
    useEditorKeyboard(schema, selected, setSelected, setSchema, batch);
    useAutoSave(invitationId, schema, true);

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <EditorHeader
                invit={invit}
                undo={undo}
                redo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
                mode={mode}
                setMode={setMode}
                csrf_token={csrf_token}
                invitationId={invitationId}
            />

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
