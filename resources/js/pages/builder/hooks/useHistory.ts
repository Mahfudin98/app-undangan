import { useCallback, useRef, useState } from 'react';
import type { EditorSchema } from '../helpers/types';

const MAX_HISTORY = 50;

export function useHistory(initial: EditorSchema) {
    const [past, setPast] = useState<EditorSchema[]>([]);
    const [present, setPresent] = useState<EditorSchema>(initial);
    const [future, setFuture] = useState<EditorSchema[]>([]);

    const lockRef = useRef(false);

    const commit = useCallback(
        (next: EditorSchema) => {
            if (lockRef.current) {
                setPresent(next);
                return;
            }

            setPast((prev) => {
                const updated = [...prev, present];
                return updated.length > MAX_HISTORY
                    ? updated.slice(updated.length - MAX_HISTORY)
                    : updated;
            });

            setPresent(next);
            setFuture([]);
        },
        [present],
    );

    const undo = useCallback(() => {
        if (past.length === 0) return;

        const previous = past[past.length - 1];
        setPast((p) => p.slice(0, p.length - 1));
        setFuture((f) => [present, ...f]);
        setPresent(previous);
    }, [past, present]);

    const redo = useCallback(() => {
        if (future.length === 0) return;

        const next = future[0];
        setFuture((f) => f.slice(1));
        setPast((p) => [...p, present]);
        setPresent(next);
    }, [future, present]);

    const batch = useCallback((fn: () => void) => {
        lockRef.current = true;
        fn();
        lockRef.current = false;
    }, []);

    return {
        schema: present,
        setSchema: commit,
        undo,
        redo,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        batch,
    };
}
