import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { EditorSchema } from '../helpers/types';
import SortableNode from './sortableNode';

type Props = {
    schema: EditorSchema;
    selectedNodeId: string | null;
    onSelectNode: (id: string) => void;
};

export default function CanvasEditor({
    schema,
    selectedNodeId,
    onSelectNode,
}: Props) {
    // 🔒 AMBIL SECTION (BOLEH UNDEFINED)
    const section = schema.sections[0];

    // ✅ HOOK HARUS DIPANGGIL SELALU
    const { setNodeRef, isOver } = useDroppable({
        id: section?.id ?? 'canvas-droppable',
    });

    // ⛔ RETURN SETELAH HOOK
    if (!section) {
        return (
            <div ref={setNodeRef} className="flex-1 bg-primary p-6">
                <div className="text-black">Drop component di sini</div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            className={`flex-1 p-6 transition-colors ${
                isOver ? 'bg-blue-600' : 'bg-gray-300'
            }`}
        >
            <SortableContext
                items={section.children.map((n) => n.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {section.children.map((node) => (
                        <SortableNode
                            key={node.id}
                            node={node}
                            isSelected={node.id === selectedNodeId}
                            onClick={() => onSelectNode(node.id)}
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
