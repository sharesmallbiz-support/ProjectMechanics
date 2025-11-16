import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Circle, Loader2, CheckCircle, Copy, Download, Edit2, Save, X, AlertCircle } from 'lucide-react';

function StepCard({
  step,
  status,
  output,
  isEditing,
  onStartEdit,
  onEditContent,
  onSaveEdit,
  onCancelEdit,
  isSaved,
  isEdited
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editedText, setEditedText] = useState('');

  const hasOutput = output && output.output;
  const isEditable = step.id !== 'CRITIQUE'; // Critique is not editable
  const showEditControls = hasOutput && isEditable && status === 'complete';

  // Auto-expand active or complete steps
  React.useEffect(() => {
    if (status === 'active' || (status === 'complete' && !isExpanded)) {
      setIsExpanded(true);
    }
  }, [status]);

  // Initialize edit text when entering edit mode
  React.useEffect(() => {
    if (isEditing && hasOutput) {
      setEditedText(output.output);
    }
  }, [isEditing, hasOutput]);

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

  const handleStartEdit = () => {
    onStartEdit(step.outputKey);
  };

  const handleSave = () => {
    onEditContent(step.outputKey, editedText);
    onSaveEdit(step.outputKey);
  };

  const handleCancel = () => {
    setEditedText(output.output);
    onCancelEdit(step.outputKey);
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
    if (isEditing) return 'border-amber-400';
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
                {isEdited && !isEditing && (
                  <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded flex items-center gap-1">
                    <Edit2 className="w-3 h-3" />
                    Edited
                  </span>
                )}
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
                    {/* Edit Mode Buttons */}
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {showEditControls && (
                          <button
                            onClick={handleStartEdit}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                        )}
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
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Unsaved Changes Warning */}
              {isEditing && !isSaved && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    You have unsaved changes. Save them before proceeding to the next step.
                  </p>
                </div>
              )}

              {/* Output Content - View Mode */}
              {isExpanded && !isEditing && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
                    {output.output}
                  </pre>
                </div>
              )}

              {/* Output Content - Edit Mode */}
              {isExpanded && isEditing && (
                <div className="border-2 border-amber-400 rounded-lg overflow-hidden">
                  <textarea
                    value={editedText}
                    onChange={(e) => {
                      setEditedText(e.target.value);
                      onEditContent(step.outputKey, e.target.value);
                    }}
                    className="w-full h-96 px-4 py-3 font-mono text-sm text-gray-800 resize-none focus:outline-none"
                    placeholder="Edit your content here..."
                  />
                  <div className="bg-amber-50 px-4 py-2 border-t border-amber-200">
                    <p className="text-xs text-amber-700">
                      Editing mode active - {editedText.length} characters
                    </p>
                  </div>
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
