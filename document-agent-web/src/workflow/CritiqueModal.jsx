import React from 'react';
import { CheckCircle, X, AlertTriangle, Copy, Download } from 'lucide-react';

function CritiqueModal({ critique, onAccept, onReject }) {
  const [copied, setCopied] = React.useState(false);

  if (!critique) return null;

  const handleCopy = () => {
    if (critique.output) {
      navigator.clipboard.writeText(critique.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (critique.output) {
      const blob = new Blob([critique.output], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'critique_report.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl font-bold text-gray-900">
                Quality Review Complete
              </h2>
            </div>
            <p className="text-gray-600">
              The Quality Reviewer has analyzed your document draft and provided detailed feedback.
              Review the critique below and decide whether to apply the improvements.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Metadata */}
          {critique.metadata && (
            <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-gray-200 text-sm text-gray-600">
              {critique.metadata.processingTime && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Review Time:</span>
                  <span>{critique.metadata.processingTime}</span>
                </div>
              )}
              {critique.metadata.confidence && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Confidence:</span>
                  <span>{(critique.metadata.confidence * 100).toFixed(0)}%</span>
                </div>
              )}
              {critique.metadata.wordCount && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Feedback Length:</span>
                  <span>{critique.metadata.wordCount.toLocaleString()} words</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Critique'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Critique Content */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
              {critique.output}
            </pre>
          </div>
        </div>

        {/* Footer - Decision Buttons */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col gap-4">
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Choose how to proceed:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Accept:</strong> Apply the critique feedback in the final document</li>
                    <li><strong>Reject:</strong> Skip the critique and finalize the document as-is</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onReject}
                className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 bg-white border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
                Reject Critique
              </button>
              <button
                onClick={onAccept}
                className="flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
              >
                <CheckCircle className="w-5 h-5" />
                Accept & Apply Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CritiqueModal;
