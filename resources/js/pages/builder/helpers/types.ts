export type BaseStyle = {
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    textAlign?: 'left' | 'center' | 'right';
};

export type BaseNode = {
    id: string;
    type: string;
    style?: BaseStyle;
};

export type TextProps = {
    text: string;
    tag: 'h1' | 'h2' | 'p';
};

export type TextNode = BaseNode & {
    type: 'text';
    props: TextProps;
};

export type EditorNode = TextNode;

export type SectionNode = {
    id: string;
    children: EditorNode[];
};

export type EditorSchema = {
    sections: SectionNode[];
};
