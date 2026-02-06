import { useDraggable } from '@dnd-kit/core';
import type { BlockType } from '../helpers/blocks';

function DraggableBlock({ type, label }: { type: BlockType; label: string }) {
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
            className="cursor-grab rounded border bg-primary p-2"
        >
            {label}
        </div>
    );
}

export default function SidebarEditor() {
    return (
        <div className="w-64 space-y-2 border-r p-4">
            <DraggableBlock type="text" label="Text" />
        </div>
    );
}
