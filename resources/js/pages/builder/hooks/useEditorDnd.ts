import {
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragOverEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { createNode } from '../helpers/blocks';
import { reorderNodes } from '../helpers/dnd';
import type { EditorSchema } from '../helpers/types';
import { reorderArray } from '../helpers/utils';

export function useEditorDnd(
    schema: EditorSchema,
    setSchema: (next: EditorSchema) => void,
    batch: (fn: () => void) => void,
) {
    const [activeDrag, setActiveDrag] = useState<{
        from?: 'sidebar' | 'canvas';
        blockType?: 'text' | 'image';
    } | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    );

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

    return {
        sensors,
        activeDrag,
        overId,
        handleDragEnd,
        handleDragOver,
        setActiveDrag,
    };
}
