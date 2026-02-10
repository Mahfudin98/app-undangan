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

export type EditorNode = TextNode | ImageNode;

export type SectionNode = {
    id: string;
    style?: SectionStyle;
    children: EditorNode[];
};

export type EditorSchema = {
    sections: SectionNode[];
};

// image
export type AlignStyle = 'left' | 'center' | 'right';
export type ImageProps = {
    src: string;
    alt?: string;
    width?: number; // px
    align?: AlignStyle;
};

export type ImageNode = BaseNode & {
    type: 'image';
    props: ImageProps;
};

// section
export type SectionStyle = {
    backgroundColor?: string;
    padding?: number;
    fullWidth?: boolean;
};

// data invitation
export interface Invitation {
    slug: string;
    status: 'draft' | 'active' | 'expired' | 'suspended';
}

// section
export type Selection =
    | { type: 'node'; id: string }
    | { type: 'section'; id: string }
    | null;
