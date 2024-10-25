import React, { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  List,
  Link as LinkIcon,
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const editorRef = useRef(null);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleLink = () => {
    setIsAddingLink(true);
    // Store the current selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // After a short delay, prompt for the URL
    setTimeout(() => {
      const url = prompt('Enter the URL:');
      if (url) {
        // Restore the selection
        selection.removeAllRanges();
        selection.addRange(range);
        // Create the link
        document.execCommand('createLink', false, url);
      }
      setIsAddingLink(false);
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 0);
  };

  const handleContentChange = (e) => {
    const content = e.target.innerHTML;
    onChange(content);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
        <button
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold size={18} className={`${document.queryCommandState('bold') ? 'text-blue-500' : ''}`} />
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic size={18} className={`${document.queryCommandState('italic') ? 'text-blue-500' : ''}`} />
        </button>
        <button
          onClick={() => handleFormat('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <List size={18} className={`${document.queryCommandState('insertUnorderedList') ? 'text-blue-500' : ''}`} />
        </button>
        <button
          onClick={handleLink}
          className={`p-2 hover:bg-gray-200 rounded transition-colors ${isAddingLink ? 'bg-gray-200' : ''}`}
          title="Insert Link"
        >
          <LinkIcon size={18} className={`${document.queryCommandState('createLink') ? 'text-blue-500' : ''}`} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        placeholder={placeholder}
        onKeyDown={(e) => {
          // Ensure Enter key works properly with lists
          if (e.key === 'Enter' && document.queryCommandState('insertUnorderedList')) {
            // Let the browser handle the Enter key naturally in list mode
            return;
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;