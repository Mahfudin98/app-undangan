import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { EditorNode } from '../helpers/types';

type Props = {
    node: EditorNode;
    isSelected: boolean;
    onClick: () => void;
};

export default function SortableNode({ node, isSelected, onClick }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: node.id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const ring = isSelected ? 'ring-2 ring-primary' : '';

    if (node.type === 'text') {
        const Tag = node.props.tag;
        return (
            <Tag
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={onClick}
                className={`cursor-move bg-white p-2 ${ring}`}
            />
        );
    }
}
