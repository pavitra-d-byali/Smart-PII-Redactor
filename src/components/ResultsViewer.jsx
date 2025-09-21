import React, { useState } from 'react';
    import { Copy, Download, Eye, Code, FileText } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from 'react-toastify';

    const ResultsViewer = ({ originalContent, redactedContent, metadata, fileType }) => {
      const [viewMode, setViewMode] = useState('side-by-side');
      const [showMetadata, setShowMetadata] = useState(false);

      const copyToClipboard = async (content) => {
        try {
          await navigator.clipboard.writeText(content);
          toast.success('Content copied to clipboard');
        } catch (err) {
          toast.error('Failed to copy content');
        }
      };

      const downloadFile = (content, filename, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('File downloaded successfully');
      };

      const highlightPII = (content, detections) => {
        if (!detections || !Array.isArray(detections)) return content;
        
        let highlightedContent = content;
        detections.forEach((detection, index) => {
          const { start, end, type, confidence } = detection;
          const originalText = content.substring(start, end);
          const highlightedText = <mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded" title="${type} (${Math.round(confidence * 100)}% confidence)">${originalText}</mark>;
          highlightedContent = highlightedContent.replace(originalText, highlightedText);
        });
        return highlightedContent;
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 overflow-hidden"
        >
          <div className="border-b border-slate-200 dark:border-zinc-700 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Results</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'side-by-side' ? 'redacted-only' : 'side-by-side')}
                  className="px-3 py-1 text-sm bg-slate-100 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  {viewMode === 'side-by-side' ? 'Redacted Only' : 'Side by Side'}
                </button>
                <button
                  onClick={() => setShowMetadata(!showMetadata)}
                  className="px-3 py-1 text-sm bg-slate-100 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
                >
                  <Code className="h-4 w-4 inline mr-1" />
                  Metadata
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {viewMode === 'side-by-side' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-zinc-900 dark:text-white">Original</h4>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-4 h-64 overflow-auto border border-slate-200 dark:border-zinc-700">
                    <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-['Roboto_Mono']">
                      {originalContent}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-zinc-900 dark:text-white">Redacted</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(redactedContent)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-zinc-500" />
                      </button>
                      <button
                        onClick={() => downloadFile(redactedContent, 'redacted_document.txt')}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded transition-colors"
                        title="Download file"
                      >
                        <Download className="h-4 w-4 text-zinc-500" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-4 h-64 overflow-auto border border-slate-200 dark:border-zinc-700">
                    <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-['Roboto_Mono']">
                      {redactedContent}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-zinc-900 dark:text-white">Redacted Content</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(redactedContent)}
                      className="px-3 py-1 text-sm bg-blue-700 text-white hover:bg-blue-800 rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4 inline mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={() => downloadFile(redactedContent, 'redacted_document.txt')}
                      className="px-3 py-1 text-sm bg-cyan-500 text-white hover:bg-cyan-600 rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4 inline mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-4 h-96 overflow-auto border border-slate-200 dark:border-zinc-700">
                  <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-['Roboto_Mono']">
                    {redactedContent}
                  </pre>
                </div>
              </div>
            )}

            {showMetadata && metadata && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 bg-slate-50 dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-700"
              >
                <h4 className="font-medium text-zinc-900 dark:text-white mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Processing Metadata
                </h4>
                <pre className="text-xs text-zinc-600 dark:text-zinc-400 overflow-auto font-['Roboto_Mono']">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </motion.div>
            )}
          </div>
        </motion.div>
      );
    };

    export default ResultsViewer;
