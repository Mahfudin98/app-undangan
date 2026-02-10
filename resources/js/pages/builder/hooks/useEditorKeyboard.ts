import { useEffect } from 'react';
import type { EditorSchema, Selection } from '../helpers/types';
import { duplicateNode, removeNode } from '../helpers/utils';

export function useEditorKeyboard(
    schema: EditorSchema,
    selected: Selection,
    setSelected: (value: Selection) => void,
    setSchema: (next: EditorSchema) => void,
    batch: (fn: () => void) => void,
) {
    useEffect(() => {
        const isTyping = (el: Element | null) =>
            el && ['input', 'textarea'].includes(el.tagName.toLowerCase());

        const onKey = (e: KeyboardEvent) => {
            if (!selected) return;
            if (isTyping(document.activeElement)) return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                batch(() => setSchema(removeNode(schema, selected.id)));
                setSelected(null);
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                batch(() => setSchema(duplicateNode(schema, selected.id)));
            }

            if (e.key === 'Escape') setSelected(null);
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schema, selected]);
}
