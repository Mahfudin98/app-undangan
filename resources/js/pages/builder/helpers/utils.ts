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
    setSchema: (next: EditorSchema) => void,
    nodeId: string,
    patch: Partial<EditorNode>,
) {
    setSchema({
        ...schema,
        sections: schema.sections.map((section) => ({
            ...section,
            children: section.children.map((node) => {
                if (node.id !== nodeId) return node;

                return {
                    ...node,
                    ...(patch.props
                        ? { props: { ...node.props, ...patch.props } }
                        : {}),
                    ...(patch.style
                        ? { style: { ...node.style, ...patch.style } }
                        : {}),
                } as EditorNode;
            }),
        })),
    });
}

export function removeNode(schema: EditorSchema, nodeId: string): EditorSchema {
    return {
        ...schema,
        sections: schema.sections.map((section) => ({
            ...section,
            children: section.children.filter((n) => n.id !== nodeId),
        })),
    };
}

export function duplicateNode(
    schema: EditorSchema,
    nodeId: string,
): EditorSchema {
    return {
        ...schema,
        sections: schema.sections.map((section) => {
            const idx = section.children.findIndex((n) => n.id === nodeId);
            if (idx === -1) return section;

            const original = section.children[idx];
            const clone: EditorNode = {
                ...original,
                id: crypto.randomUUID(),
            };

            const next = [...section.children];
            next.splice(idx + 1, 0, clone);

            return { ...section, children: next };
        }),
    };
}

export function addSection(schema: EditorSchema): EditorSchema {
    return {
        ...schema,
        sections: [
            ...schema.sections,
            {
                id: crypto.randomUUID(),
                children: [],
            },
        ],
    };
}

export function removeSection(
    schema: EditorSchema,
    sectionId: string,
): EditorSchema {
    if (schema.sections.length <= 1) {
        return schema;
    }

    return {
        ...schema,
        sections: schema.sections.filter((s) => s.id !== sectionId),
    };
}

export function reorderArray<T extends { id: string }>(
    items: T[],
    fromId: string,
    toId: string,
): T[] {
    const fromIndex = items.findIndex((i) => i.id === fromId);
    const toIndex = items.findIndex((i) => i.id === toId);
    if (fromIndex === -1 || toIndex === -1) return items;

    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
}
