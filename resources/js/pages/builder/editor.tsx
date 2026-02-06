import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { createNode } from './helpers/blocks';
import { reorderNodes } from './helpers/dnd';
import type { EditorSchema } from './helpers/types';
import { useAutoSave } from './helpers/useAutosave';
import CanvasEditor from './modules/canvas';
import Inspector from './modules/inspector';
import SidebarEditor from './modules/sidebar';

export default function Editor() {
    const { invitationId } = usePage<{ invitationId: number }>().props;

    const [schema, setSchema] = useState<EditorSchema>({
        sections: [
            {
                id: crypto.randomUUID(),
                children: [],
            },
        ],
    });

    const [activeDrag, setActiveDrag] = useState<any>(null);

    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 👈 harus digeser 8px baru dianggap drag
            },
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeData = active.data.current;
        const section = schema.sections[0];
        if (!section) return;

        // 👉 DRAG DARI SIDEBAR → DROP KE CANVAS
        if (activeData?.from === 'sidebar' && over.id === section.id) {
            const newNode = createNode(activeData.blockType);

            setSchema((prev) => ({
                ...prev,
                sections: prev.sections.map((s) =>
                    s.id === section.id
                        ? { ...s, children: [...s.children, newNode] }
                        : s,
                ),
            }));
            return;
        }

        // 👉 REORDER NODE (NODE ↔ NODE)
        if (active.id !== over.id) {
            setSchema((prev) =>
                reorderNodes(
                    prev,
                    section.id,
                    String(active.id),
                    String(over.id),
                ),
            );
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('editor_token');
        if (!token) return;

        fetch(`/builder/${invitationId}/data`, {
            headers: { 'X-Editor-Token': token },
        })
            .then((res) => res.json())
            .then((data) => {
                const loadedSchema: EditorSchema = data.schema;

                // 🔒 PASTIKAN ADA SECTION
                if (loadedSchema.sections.length === 0) {
                    loadedSchema.sections.push({
                        id: crypto.randomUUID(),
                        children: [],
                    });
                }

                setSchema(loadedSchema);
                setIsHydrated(true);
            });
    }, [invitationId]);

    useAutoSave(invitationId, schema, isHydrated);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => {
                setActiveDrag(event.active.data.current);
            }}
            onDragEnd={(event) => {
                handleDragEnd(event);
                setActiveDrag(null);
            }}
            onDragCancel={() => setActiveDrag(null)}
        >
            <div className="flex h-screen">
                <SidebarEditor />
                <DragOverlay>
                    {activeDrag?.from === 'sidebar' && (
                        <div className="rounded border bg-white px-4 py-2 shadow">
                            Text
                        </div>
                    )}
                </DragOverlay>
                <CanvasEditor
                    schema={schema}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                />
                <Inspector
                    schema={schema}
                    selectedNodeId={selectedNodeId}
                    setSchema={setSchema}
                />
            </div>
        </DndContext>
    );
}
