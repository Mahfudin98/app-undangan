import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import type { SectionNode } from '../helpers/types';

type Props = {
    section: SectionNode;
    children: React.ReactNode;
    onSelect: () => void;
    onDelete: () => void;
    isSelected: boolean;
};

export default function SortableSection({
    section,
    children,
    onSelect,
    onDelete,
    isSelected,
}: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: section.id,
        data: { type: 'section' },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        backgroundColor: section.style?.backgroundColor,
        padding: section.style?.padding ?? 24,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative rounded border ${
                isSelected ? 'ring-2 ring-primary' : ''
            }`}
        >
            {/* 🔹 SECTION TOOLBAR (INI YANG SELECT SECTION) */}
            <div
                className="absolute top-2 left-2 z-10 flex items-center gap-2 rounded bg-white px-2 py-1 shadow"
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                }}
            >
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-slate-500 hover:text-slate-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    <GripVertical className="size-4" />
                </button>

                <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 className="size-4" />
                </button>

                <span className="text-xs font-semibold text-slate-500">
                    Section
                </span>
            </div>

            {/* 🔹 CONTENT AREA (NODE CLICK AMAN) */}
            <div
                className={
                    section.style?.fullWidth ? 'w-full' : 'mx-auto max-w-4xl'
                }
            >
                {children}
            </div>
        </div>
    );
}
