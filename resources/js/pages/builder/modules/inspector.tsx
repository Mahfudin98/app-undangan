import type { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { EditorSchema } from '../helpers/types';
import { findNode, updateNode } from '../helpers/utils';

type Props = {
    schema: EditorSchema;
    setSchema: Dispatch<SetStateAction<EditorSchema>>;
    selectedNodeId: string | null;
};

export default function Inspector({
    schema,
    setSchema,
    selectedNodeId,
}: Props) {
    if (!selectedNodeId) {
        return (
            <div className="w-72 border-l p-4 text-gray-500">Pilih elemen</div>
        );
    }

    const node = findNode(schema, selectedNodeId);
    if (!node) return null;

    if (node.type === 'text') {
        return (
            <div className="w-72 space-y-4 border-l p-4">
                <div>
                    <Label className="text-sm">Text</Label>
                    <Input
                        type="text"
                        value={node.props.text}
                        onChange={(e) =>
                            updateNode(schema, setSchema, node.id, {
                                props: { ...node.props, text: e.target.value },
                            })
                        }
                    />
                </div>

                <div>
                    <Label className="text-sm">Font Size</Label>
                    <Input
                        type="number"
                        value={node.style?.fontSize ?? 16}
                        onChange={(e) =>
                            updateNode(schema, setSchema, node.id, {
                                style: {
                                    ...node.style,
                                    fontSize: +e.target.value,
                                },
                            })
                        }
                    />
                </div>
            </div>
        );
    }

    return null;
}
