import { arrayMove } from '@dnd-kit/sortable';
import type { EditorSchema } from './types';

export function reorderNodes(
    schema: EditorSchema,
    sectionId: string,
    activeId: string,
    overId: string,
): EditorSchema {
    return {
        ...schema,
        sections: schema.sections.map((section) => {
            if (section.id !== sectionId) return section;

            const oldIndex = section.children.findIndex(
                (n) => n.id === activeId,
            );
            const newIndex = section.children.findIndex((n) => n.id === overId);

            if (oldIndex === -1 || newIndex === -1) return section;

            return {
                ...section,
                children: arrayMove(section.children, oldIndex, newIndex),
            };
        }),
    };
}
