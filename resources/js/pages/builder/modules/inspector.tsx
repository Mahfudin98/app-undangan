import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { AlignStyle, EditorSchema } from '../helpers/types';
import { findNode, updateNode } from '../helpers/utils';

/* =======================
   TYPES
======================= */
type Selection =
    | { type: 'node'; id: string }
    | { type: 'section'; id: string }
    | null;

type Props = {
    schema: EditorSchema;
    setSchema: (next: EditorSchema) => void;
    selected: Selection;
};

export default function Inspector({ schema, setSchema, selected }: Props) {
    if (!selected) {
        return (
            <div className="w-72 border-l p-4 text-sm text-slate-500">
                No selection
            </div>
        );
    }

    /* =======================
       SECTION INSPECTOR
    ======================= */
    if (selected.type === 'section') {
        const section = schema.sections.find((s) => s.id === selected.id);
        if (!section) return null;

        return (
            <div className="flex w-72 flex-col gap-4 overflow-y-auto border-l border-slate-200 bg-background p-4 dark:border-slate-800">
                <h3 className="text-sm font-bold">Section</h3>

                <div>
                    <Label className="text-xs">Background</Label>
                    <input
                        type="color"
                        value={section.style?.backgroundColor ?? '#ffffff'}
                        onChange={(e) =>
                            setSchema({
                                ...schema,
                                sections: schema.sections.map((s) =>
                                    s.id === section.id
                                        ? {
                                              ...s,
                                              style: {
                                                  ...s.style,
                                                  backgroundColor:
                                                      e.target.value,
                                              },
                                          }
                                        : s,
                                ),
                            })
                        }
                    />
                </div>

                <div>
                    <Label className="text-xs">Padding</Label>
                    <Input
                        type="number"
                        value={section.style?.padding ?? 24}
                        onChange={(e) =>
                            setSchema({
                                ...schema,
                                sections: schema.sections.map((s) =>
                                    s.id === section.id
                                        ? {
                                              ...s,
                                              style: {
                                                  ...s.style,
                                                  padding: Number(
                                                      e.target.value,
                                                  ),
                                              },
                                          }
                                        : s,
                                ),
                            })
                        }
                    />
                </div>

                <label className="flex items-center gap-2 text-xs">
                    <input
                        type="checkbox"
                        checked={section.style?.fullWidth ?? false}
                        onChange={(e) =>
                            setSchema({
                                ...schema,
                                sections: schema.sections.map((s) =>
                                    s.id === section.id
                                        ? {
                                              ...s,
                                              style: {
                                                  ...s.style,
                                                  fullWidth: e.target.checked,
                                              },
                                          }
                                        : s,
                                ),
                            })
                        }
                    />
                    Full width
                </label>
            </div>
        );
    }

    /* =======================
       NODE INSPECTOR
    ======================= */
    const node = findNode(schema, selected.id);
    if (!node) return null;

    // TEXT NODE
    if (node.type === 'text') {
        return (
            <div className="flex w-72 flex-col gap-3 overflow-y-auto border-l border-slate-200 bg-background p-4 dark:border-slate-800">
                <h3 className="text-sm font-bold">Text</h3>

                <div>
                    <Label className="text-xs">Content</Label>
                    <Input
                        type="text"
                        value={node.props.text}
                        onChange={(e) =>
                            updateNode(schema, setSchema, node.id, {
                                props: {
                                    ...node.props,
                                    text: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div>
                    <Label className="text-xs">Font Size</Label>
                    <Input
                        type="number"
                        value={node.style?.fontSize ?? 16}
                        onChange={(e) =>
                            updateNode(schema, setSchema, node.id, {
                                style: {
                                    ...node.style,
                                    fontSize: Number(e.target.value),
                                },
                            })
                        }
                    />
                </div>
            </div>
        );
    }

    // IMAGE NODE
    if (node.type === 'image') {
        return (
            <div className="flex w-72 flex-col gap-3 overflow-y-auto border-l border-slate-200 bg-background p-4 dark:border-slate-800">
                <h3 className="text-sm font-bold">Image</h3>

                <div>
                    <Label className="text-xs">Image URL</Label>
                    <Input
                        type="text"
                        value={node.props.src}
                        onChange={(e) =>
                            updateNode(schema, setSchema, node.id, {
                                props: {
                                    ...node.props,
                                    src: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div>
                    <Label className="text-xs">Width (px)</Label>
                    <Input
                        type="number"
                        value={node.props.width ?? 400}
                        onChange={(e) =>
                            updateNode(schema, setSchema, node.id, {
                                props: {
                                    ...node.props,
                                    width: Number(e.target.value),
                                },
                            })
                        }
                    />
                </div>

                <div>
                    <Label className="text-xs">Align</Label>
                    <Select
                        value={node.props.align ?? 'center'}
                        onValueChange={(value) =>
                            updateNode(schema, setSchema, node.id, {
                                props: {
                                    ...node.props,
                                    align: value as AlignStyle,
                                },
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        );
    }

    return null;
}
