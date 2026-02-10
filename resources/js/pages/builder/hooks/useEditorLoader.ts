import { useEffect } from 'react';
import type { EditorSchema, Invitation } from '../helpers/types';

export function useEditorLoader(
    invitationId: number,
    setSchema: (next: EditorSchema) => void,
    setInvit: (next: Invitation) => void,
) {
    useEffect(() => {
        const token = localStorage.getItem('editor_token');
        if (!token) return;

        fetch(`/invitation/builder/${invitationId}/data`, {
            headers: { 'X-Editor-Token': token },
        })
            .then((res) => res.json())
            .then((data) => {
                const loaded = data.schema;
                if (loaded.sections.length === 0) {
                    loaded.sections.push({
                        id: crypto.randomUUID(),
                        children: [],
                    });
                }
                setSchema(loaded);
                setInvit(data.data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invitationId]);
}
