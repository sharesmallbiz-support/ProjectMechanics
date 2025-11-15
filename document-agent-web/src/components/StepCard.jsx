import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Circle, Loader2, CheckCircle, Copy, Download } from 'lucide-react';

function StepCard({ step, status, output }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasOutput = output && output.output;

  // Auto-expand active or complete steps
  React.useEffect(() => {
    if (status === 'active' || (status === 'complete' && !isExpanded)) {
      setIsExpanded(true);
    }
  }, [status]);

  const handleCopy = () => {
    if (hasOutput) {
      navigator.clipboard.writeText(output.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (hasOutput) {
      const blob = new Blob([output.output], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${step.id.toLowerCase()}_output.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getStatusIcon = () => {
    if (status === 'complete') {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
    if (status === 'active') {
      return <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />;
    }
    return <Circle className="w-6 h-6 text-gray-300" />;
  };

  const getStatusBadge = () => {
    const badges = {
      pending: <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">Pending</span>,
      active: <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded">Processing...</span>,
      complete: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">Complete</span>
    };
    return badges[status];
  };

  const getBorderColor = () => {
    if (status === 'complete') return 'border-green-400';
    if (status === 'active') return 'border-primary-400';
    return 'border-gray-200';
  };

  return (
    <div className={`step-card ${getBorderColor()} p-6`}>
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-1">
          {getStatusIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{step.icon}</span>
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-600">
                Agent: {step.agentPersona}
              </p>
            </div>
            <div className="flex-shrink-0">
              {getStatusBadge()}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">
            {step.description}
          </p>

          {/* Metadata */}
          {hasOutput && output.metadata && (
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              {output.metadata.processingTime && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Time:</span>
                  <span>{output.metadata.processingTime}</span>
                </div>
              )}
              {output.metadata.confidence && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Confidence:</span>
                  <span>{(output.metadata.confidence * 100).toFixed(0)}%</span>
                </div>
              )}
              {output.metadata.wordCount && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Words:</span>
                  <span>{output.metadata.wordCount.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}

          {/* Output Section */}
          {hasOutput && (
            <div className="mt-4">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Output
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show Output
                    </>
                  )}
                </button>

                {isExpanded && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>

              {/* Output Content */}
              {isExpanded && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
                    {output.output}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Pending State Message */}
          {!hasOutput && status === 'pending' && (
            <div className="mt-4 text-sm text-gray-500 italic">
              Waiting for previous steps to complete...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepCard;
