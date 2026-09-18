inport {type ImageFile} from '@/app/types/media';

export interface ImageSection {
    files: FileItem[];
}

export interface MarkdownBodySection {
    html: string;
}

export interface BlogItem {
    id: string;
    created: string;
    lastModifiedUtc: string;
    image:ImageSection;
    displayText: string;
    markdownBody: MarkdownBodySection;
}

