import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Shield, Zap, Lock, Globe, FileText, Image, Scan } from 'lucide-react';
    import { toast } from 'react-toastify';
    
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import FileUpload from '../components/FileUpload';
    import RedactionSettings from '../components/RedactionSettings';
    import ProcessingStatus from '../components/ProcessingStatus';
    import ResultsViewer from '../components/ResultsViewer';

    const Home = () => {
      const [selectedFiles, setSelectedFiles] = useState([]);
      const [redactionSettings, setRedactionSettings] = useState(null);
      const [processingStatus, setProcessingStatus] = useState('idle');
      const [processingProgress, setProcessingProgress] = useState(0);
      const [results, setResults] = useState(null);

      const handleFilesSelect = (files) => {
        setSelectedFiles(files);
        setResults(null);
        setProcessingStatus('idle');
      };

      const handleSettingsChange = (settings) => {
        setRedactionSettings(settings);
      };

      const simulateProcessing = async () => {
        if (selectedFiles.length === 0) {
          toast.error('Please select files to process');
          return;
        }

        setProcessingStatus('processing');
        setProcessingProgress(0);

        // Simulate processing with progress updates
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setProcessingProgress(i);
        }

        // Simulate results
        const mockResults = {
          originalContent: "John Doe lives at 123 Main Street, New York, NY 10001. His phone number is (555) 123-4567 and email is john.doe@email.com. His SSN is 123-45-6789.",
          redactedContent: "XXXX XXXX lives at XXXX XXXX XXXX, XXXX XXXX, XX XXXXX. His phone number is (XXX) XXX-XXXX and email is XXXX.XXXX@XXXXX.XXX. His SSN is XXX-XX-XXXX.",
          metadata: {
            totalDetected: 5,
            totalRedacted: 5,
            avgConfidence: 0.92,
            processingTime: '2.3s',
            detections: [
              { type: 'name', start: 0, end: 8, confidence: 0.95 },
              { type: 'address', start: 18, end: 49, confidence: 0.89 },
              { type: 'phone', start: 72, end: 86, confidence: 0.94 },
              { type: 'email', start: 100, end: 119, confidence: 0.91 },
              { type: 'ssn', start: 132, end: 143, confidence: 0.97 }
            ]
          }
        };

        setResults(mockResults);
        setProcessingStatus('completed');
        toast.success('Processing completed successfully!');
      };

      const features = [
        {
          icon: Shield,
          title: 'Advanced PII Detection',
          description: 'Detect names, addresses, phone numbers, emails, government IDs, and more with high accuracy.'
        },
        {
          icon: FileText,
          title: 'Multi-format Support',
          description: 'Process text files, PDFs, and images with OCR capabilities for comprehensive document handling.'
        },
        {
          icon: Globe,
          title: 'Multilingual Support',
          description: 'Support for English, Hindi, Kannada, and Telugu languages for diverse document processing.'
        },
        {
          icon: Zap,
          title: 'Fast Processing',
          description: 'High-performance processing with batch capabilities and real-time progress tracking.'
        },
        {
          icon: Lock,
          title: 'Secure & Private',
          description: 'Enterprise-grade security with no data retention and complete privacy protection.'
        },
        {
          icon: Scan,
          title: 'Visual Element Detection',
          description: 'Detect and redact photos, signatures, QR codes, and barcodes from documents.'
        }
      ];

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          
          <main>
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 font-['Inter']">
                    Smart <span className="text-blue-700">PII Redactor</span>
                  </h1>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto">
                    Professional-grade PII detection and redaction for documents, images, and text. 
                    Secure, fast, and compliant with privacy regulations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                    >
                      Start Redacting
                    </button>
                    <button className="px-8 py-3 border border-slate-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors font-semibold">
                      View Documentation
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                    Powerful Features
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Comprehensive PII detection and redaction capabilities designed for enterprise needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-700"
                      >
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-blue-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          {feature.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Upload and Processing Section */}
            <section id="upload-section" className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                    Process Your Documents
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Upload your files and configure redaction settings to get started.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <FileUpload onFilesSelect={handleFilesSelect} />
                    
                    <ProcessingStatus
                      status={processingStatus}
                      progress={processingProgress}
                      currentFile={1}
                      totalFiles={selectedFiles.length}
                      metadata={results?.metadata}
                    />

                    {results && (
                      <ResultsViewer
                        originalContent={results.originalContent}
                        redactedContent={results.redactedContent}
                        metadata={results.metadata}
                        fileType="text"
                      />
                    )}
                  </div>

                  <div className="space-y-6">
                    <RedactionSettings onSettingsChange={handleSettingsChange} />
                    
                    <button
                      onClick={simulateProcessing}
                      disabled={selectedFiles.length === 0 || processingStatus === 'processing'}
                      className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      {processingStatus === 'processing' ? 'Processing...' : 'Start Redaction'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      );
    };

    export default Home;
