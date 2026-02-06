import { useEffect } from 'react';
import type { EditorSchema } from './types';

function csrfToken(): string {
    const el = document.querySelector(
        'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    return el?.content ?? '';
}

export function useAutoSave(
    invitationId: number,
    schema: EditorSchema,
    enabled: boolean,
) {
    useEffect(() => {
        if (!enabled) return;

        const token = localStorage.getItem('editor_token');
        if (!token) return;

        const t = setTimeout(() => {
            fetch(`/invitation/builder/${invitationId}/save`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Editor-Token': token,
                    'X-CSRF-TOKEN': csrfToken(),
                },
                body: JSON.stringify({ schema }),
            }).then((res) => {
                if (!res.ok) {
                    console.log('Autosave failed', res.status);
                }
            });
        }, 800);

        return () => clearTimeout(t);
    }, [schema, invitationId, enabled]);
}
