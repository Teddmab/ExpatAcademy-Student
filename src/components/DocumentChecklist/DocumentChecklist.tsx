import React, { useState, useEffect } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, Clock, X } from 'lucide-react';
import api from '../../services/api';

interface Document {
  id: number;
  name: string;
  status: string;
  required: boolean;
}

interface UploadProgress {
  [key: number]: number;
}

const DocumentChecklist: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploadError, setUploadError] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/api/documents');
      setDocuments(response.data);
    } catch (err) {
      setError('Failed to load documents');
      console.error('Error fetching documents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (documentId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentId', documentId.toString());

    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    setUploadError(prev => ({ ...prev, [documentId]: '' }));

    try {
      await api.post('/api/documents/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prev => ({ ...prev, [documentId]: progress }));
          }
        }
      });

      // Update document status after successful upload
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === documentId ? { ...doc, status: 'completed' } : doc
        )
      );

      // Clear progress after success
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[documentId];
          return newProgress;
        });
      }, 1000);

    } catch (err) {
      setUploadError(prev => ({
        ...prev,
        [documentId]: 'Failed to upload document'
      }));
      console.error('Upload error:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Upload className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const calculateOverallProgress = () => {
    const completedDocs = documents.filter(doc => doc.status === 'completed').length;
    return Math.round((completedDocs / documents.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="ml-3 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Overall Progress */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900">Document Checklist</h3>
          <span className="text-sm font-medium text-gray-600">
            {calculateOverallProgress()}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${calculateOverallProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Document List */}
      <ul className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <li key={doc.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 flex-1">
                {getStatusIcon(doc.status)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    Status: {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="ml-4 flex items-center space-x-4">
                {doc.required && (
                  <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    Required
                  </span>
                )}

                {doc.status !== 'completed' && (
                  <div className="relative">
                    <input
                      type="file"
                      id={`file-${doc.id}`}
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(doc.id, file);
                      }}
                    />
                    <label
                      htmlFor={`file-${doc.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {uploadProgress[doc.id] !== undefined && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Uploading...</span>
                  <span className="text-sm text-gray-600">{uploadProgress[doc.id]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress[doc.id]}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Upload Error */}
            {uploadError[doc.id] && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {uploadError[doc.id]}
                <button
                  onClick={() => setUploadError(prev => {
                    const newError = { ...prev };
                    delete newError[doc.id];
                    return newError;
                  })}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentChecklist;