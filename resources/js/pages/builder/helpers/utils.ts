import type { Dispatch, SetStateAction } from 'react';
import type { EditorNode, EditorSchema } from './types';

export function findNode(
    schema: EditorSchema,
    nodeId: string,
): EditorNode | null {
    for (const section of schema.sections) {
        for (const node of section.children) {
            if (node.id === nodeId) return node;
        }
    }
    return null;
}

export function updateText(
    schema: EditorSchema,
    setSchema: Dispatch<SetStateAction<EditorSchema>>,
    nodeId: string,
    content: string,
) {
    setSchema({
        ...schema,
        sections: schema.sections.map((section) => ({
            ...section,
            children: section.children.map((node) =>
                node.id === nodeId && node.type === 'text'
                    ? { ...node, content }
                    : node,
            ),
        })),
    });
}

export function updateNode(
    schema: EditorSchema,
    setSchema: Dispatch<SetStateAction<EditorSchema>>,
    nodeId: string,
    patch: Partial<EditorNode>,
) {
    setSchema({
        ...schema,
        sections: schema.sections.map((section) => ({
            ...section,
            children: section.children.map((node) =>
                node.id === nodeId ? { ...node, ...patch } : node,
            ),
        })),
    });
}
