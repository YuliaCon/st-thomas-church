import DOMPurify from 'isomorphic-dompurify';

/**
 * Safely sanitizes raw HTML strings from Orchard CMS
 * and handles formatting updates like newline characters.
 */
export function getSanitizedHtml(rawHtml: string | null | undefined): string {
    if (!rawHtml) return '';

    // 1. Convert all newline characters into HTML line breaks (\n -> <br />)
    const formattedHtml = rawHtml        
        .replace('</p>', '')
        .replace('<p>', '') //orchard places <p> at the beginnig and the end of the text
        .replace(/\n/g, '<br/>');

    // 2. Clean the string using DOMPurify
    return DOMPurify.sanitize(formattedHtml);
}