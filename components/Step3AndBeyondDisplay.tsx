import React, { useState, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ClipboardIcon from './icons/ClipboardIcon';
import HtmlIcon from './icons/HtmlIcon';

interface Step3AndBeyondDisplayProps {
  report: string;
  onStartOver: () => void;
}

const Step3AndBeyondDisplay: React.FC<Step3AndBeyondDisplayProps> = ({ report, onStartOver }) => {
    const [mdCopySuccess, setMdCopySuccess] = useState(false);
    const [htmlCopySuccess, setHtmlCopySuccess] = useState(false);
    const reportContainerRef = useRef<HTMLDivElement>(null);

    const handleMarkdownCopy = useCallback(() => {
        navigator.clipboard.writeText(report).then(() => {
            setMdCopySuccess(true);
            setTimeout(() => setMdCopySuccess(false), 2000);
        });
    }, [report]);

    const handleHtmlCopy = useCallback(() => {
        if (reportContainerRef.current) {
            const html = reportContainerRef.current.innerHTML;
            const blob = new Blob([html], { type: 'text/html' });
            const item = new ClipboardItem({ 'text/html': blob });
            navigator.clipboard.write([item]).then(() => {
                setHtmlCopySuccess(true);
                setTimeout(() => setHtmlCopySuccess(false), 2000);
            }, (err) => {
                console.error('Failed to copy HTML: ', err);
            });
        }
    }, []);

    return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-200">STEP 3: 最終レポート</h2>
        <div className="flex items-center gap-2">
            <button
                onClick={handleMarkdownCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-sm text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
                title="Markdown形式でコピー"
            >
                <ClipboardIcon />
                {mdCopySuccess ? 'コピーしました！' : 'Markdownコピー'}
            </button>
             <button
                onClick={handleHtmlCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-sm text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
                title="Google Docsなどに貼り付けるためにHTML形式でコピー"
            >
                <HtmlIcon />
                {htmlCopySuccess ? 'コピーしました！' : 'HTMLコピー'}
            </button>
        </div>
      </div>

      <div
        ref={reportContainerRef}
        className="bg-gray-900/70 border border-gray-700 rounded-lg p-4 sm:p-6 my-6 prose prose-invert max-w-none 
        prose-p:text-gray-300 prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-purple-400 prose-headings:to-cyan-500
        prose-strong:text-purple-400 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
        prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-gray-600 prose-th:p-2 prose-th:bg-gray-800
        prose-td:border prose-td:border-gray-600 prose-td:p-2
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onStartOver}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
};

export default Step3AndBeyondDisplay;
