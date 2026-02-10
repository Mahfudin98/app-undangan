import { usePage } from '@inertiajs/react';
import type { EditorSchema } from './helpers/types';
import PreviewRenderer from './preview/previewRender';

export default function ExpiredInvitation() {
    const { schema } = usePage<{
        schema: EditorSchema;
    }>().props;
    return (
        <div className="relative">
            <div className="fixed top-0 left-0 h-full w-full backdrop-blur-md">
                <div className="grid h-full place-items-center text-xl font-bold text-black">
                    Undangan sudah berakhir 🥰🥰🥰
                </div>
            </div>
            <PreviewRenderer schema={schema} />
        </div>
    );
}
