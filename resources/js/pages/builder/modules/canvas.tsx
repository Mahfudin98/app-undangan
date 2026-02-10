import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EditorSchema, SectionNode } from '../helpers/types';
import { addSection, removeSection } from '../helpers/utils';
import SortableNode from './sortableNode';
import SortableSection from './sortableSection';

type Selection =
    | { type: 'node'; id: string }
    | { type: 'section'; id: string }
    | null;

type Props = {
    schema: EditorSchema;
    selected: Selection;
    onSelect: (value: Selection) => void;
    overId?: string | null;

    setSchema: (next: EditorSchema) => void;
    batch: (fn: () => void) => void;
};

export default function CanvasEditor({
    schema,
    selected,
    onSelect,
    overId,
    setSchema,
    batch,
}: Props) {
    return (
        <div
            className="flex-1 overflow-y-auto bg-slate-200 p-8"
            onClick={() => {
                onSelect(null);
            }}
        >
            <SortableContext
                items={schema.sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {schema.sections.map((section) => (
                        <CanvasSection
                            key={section.id}
                            section={section}
                            selected={selected}
                            onSelect={onSelect}
                            overId={overId}
                            batch={batch}
                            schema={schema}
                            setSchema={setSchema}
                        />
                    ))}
                </div>
                <div className="my-3 grid place-items-center rounded-md border border-dashed border-background p-2">
                    <Button
                        type="button"
                        onClick={() => {
                            batch(() => {
                                setSchema(addSection(schema));
                            });
                        }}
                        className="text-white"
                    >
                        <PlusCircle className="size-5" /> Tambah Section Baru
                    </Button>
                </div>
            </SortableContext>
        </div>
    );
}

type CanvasSectionProps = {
    section: SectionNode;
    selected: Selection;
    onSelect: (value: Selection) => void;
    overId?: string | null;
    schema: EditorSchema;
    setSchema: (next: EditorSchema) => void;
    batch: (fn: () => void) => void;
};

function CanvasSection({
    section,
    selected,
    onSelect,
    overId,
    setSchema,
    batch,
    schema,
}: CanvasSectionProps) {
    const isSectionSelected =
        selected?.type === 'section' && selected.id === section.id;

    return (
        <SortableSection
            section={section}
            isSelected={isSectionSelected}
            onSelect={() => onSelect({ type: 'section', id: section.id })}
            onDelete={() => {
                batch(() => {
                    setSchema(removeSection(schema, section.id));
                });
                onSelect(null); // reset selection
            }}
        >
            <SortableContext
                items={section.children.map((n) => n.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {section.children.map((node) => {
                        const isNodeSelected =
                            selected?.type === 'node' &&
                            selected.id === node.id;

                        return (
                            <div key={node.id}>
                                {overId === node.id && (
                                    <div className="h-1 rounded bg-blue-400" />
                                )}

                                <SortableNode
                                    node={node}
                                    isSelected={isNodeSelected}
                                    onClick={() =>
                                        onSelect({
                                            type: 'node',
                                            id: node.id,
                                        })
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </SortableContext>
        </SortableSection>
    );
}
