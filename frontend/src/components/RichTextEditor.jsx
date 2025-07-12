import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { useCallback, useState } from 'react';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link2, ImageIcon, Smile, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const EditorToolbar = ({ editor }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter the URL of the image:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="border border-gray-300 rounded-t-lg p-2 flex flex-wrap items-center gap-2 bg-gray-50">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Bold size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Italic size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Strikethrough size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><List size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><ListOrdered size={18} /></button>
            <button type="button" onClick={setLink} className={editor.isActive('link') ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><Link2 size={18} /></button>
            <button type="button" onClick={addImage}><ImageIcon size={18} /></button>
            <div className="relative">
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}><Smile size={18} /></button>
                {showEmojiPicker && (
                    <div className="absolute z-10 top-full mt-2">
                        <EmojiPicker onEmojiClick={(emojiObject) => {
                            editor.chain().focus().insertContent(emojiObject.emoji).run();
                            setShowEmojiPicker(false);
                        }} />
                    </div>
                )}
            </div>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><AlignLeft size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><AlignCenter size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300 p-1 rounded' : 'p-1 rounded'}><AlignRight size={18} /></button>
        </div>
    );
};

const RichTextEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none border border-gray-300 rounded-b-lg p-4 min-h-[200px] focus:outline-none bg-white',
            },
        },
    });

    return (
        <div>
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;