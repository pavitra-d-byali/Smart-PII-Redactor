import React from 'react';
    import { Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
    import { motion } from 'framer-motion';

    const ProcessingStatus = ({ status, progress, currentFile, totalFiles, metadata }) => {
      const getStatusIcon = () => {
        switch (status) {
          case 'processing':
            return <Loader2 className="h-5 w-5 text-blue-700 animate-spin" />;
          case 'completed':
            return <CheckCircle className="h-5 w-5 text-green-600" />;
          case 'error':
            return <AlertCircle className="h-5 w-5 text-red-600" />;
          default:
            return <Clock className="h-5 w-5 text-slate-500" />;
        }
      };

      const getStatusText = () => {
        switch (status) {
          case 'processing':
            return Processing file ${currentFile} of ${totalFiles}...;
          case 'completed':
            return 'Redaction completed successfully';
          case 'error':
            return 'Error occurred during processing';
          default:
            return 'Ready to process';
        }
      };

      const getStatusColor = () => {
        switch (status) {
          case 'processing':
            return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
          case 'completed':
            return 'border-green-200 bg-green-50 dark:bg-green-900/20';
          case 'error':
            return 'border-red-200 bg-red-50 dark:bg-red-900/20';
          default:
            return 'border-slate-200 bg-slate-50 dark:bg-zinc-800';
        }
      };

      if (status === 'idle') return null;

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={rounded-xl border p-6 ${getStatusColor()}}
        >
          <div className="flex items-center space-x-3 mb-4">
            {getStatusIcon()}
            <span className="font-medium text-zinc-900 dark:text-white">
              {getStatusText()}
            </span>
          </div>

          {status === 'processing' && (
            <div className="space-y-3">
              <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2">
                <motion.div
                  className="bg-blue-700 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: ${progress}% }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {progress}% complete
              </p>
            </div>
          )}

          {status === 'completed' && metadata && (
            <div className="mt-4 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
              <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Processing Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400">PII Detected</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">{metadata.totalDetected || 0}</p>
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400">Redacted</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">{metadata.totalRedacted || 0}</p>
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400">Confidence</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {metadata.avgConfidence ? ${Math.round(metadata.avgConfidence * 100)}% : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 dark:text-zinc-400">Processing Time</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    {metadata.processingTime || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      );
    };

    export default ProcessingStatus;
