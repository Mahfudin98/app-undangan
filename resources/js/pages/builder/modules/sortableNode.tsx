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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...node.style,
    };

    const ring = isSelected ? 'ring-2 ring-primary' : '';

    if (node.type === 'text') {
        const Tag = node.props.tag;
        return (
            <Tag
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className={`cursor-move bg-white p-2 text-black ${ring} ${node.style}`}
            >
                {node.props.text}
            </Tag>
        );
    }

    if (node.type === 'image') {
        const align =
            node.props.align === 'center'
                ? 'mx-auto'
                : node.props.align === 'right'
                  ? 'ml-auto'
                  : '';

        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className={`cursor-move ${ring} ${node.style}`}
            >
                <img
                    src={node.props.src}
                    alt={node.props.alt}
                    style={{ width: node.props.width }}
                    className={align}
                    draggable={false}
                />
            </div>
        );
    }
}
