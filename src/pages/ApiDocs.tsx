import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { parse } from 'yaml';

const ApiDocs = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const fetchSwaggerSpec = async () => {
      try {
        const response = await fetch('/swagger.yaml');
        const yamlText = await response.text();
        const parsedSpec = parse(yamlText);
        setSpec(parsedSpec);
      } catch (error) {
        console.error('Error loading Swagger spec:', error);
      }
    };

    fetchSwaggerSpec();
  }, []);

  if (!spec) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Documentation</h1>
        <div className="bg-white rounded-lg shadow-lg">
          <SwaggerUI spec={spec} />
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;