import { usePage } from '@inertiajs/react';
import type { EditorSchema } from './helpers/types';
import PreviewRenderer from './preview/previewRender';

export default function PublicInvitation() {
    const { schema } = usePage<{
        schema: EditorSchema;
    }>().props;
    return <PreviewRenderer schema={schema} />;
}
