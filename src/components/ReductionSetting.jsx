import React, { useState } from 'react';
import { Settings, Eye, EyeOff, Zap, Type } from 'lucide-react';

const RedactionSettings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    redactionMode: 'mask',
    piiTypes: {
      names: true,
      addresses: true,
      phones: true,
      emails: true,
      aadhaar: true,
      pan: true,
      ssn: true,
      creditCards: true,
      bankAccounts: true,
      qrCodes: true,
      barcodes: true,
      photos: true,
      signatures: true
    },
    languages: ['english', 'hindi'],
    confidenceThreshold: 0.8
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handlePiiTypeChange = (type, enabled) => {
    const newPiiTypes = { ...settings.piiTypes, [type]: enabled };
    const newSettings = { ...settings, piiTypes: newPiiTypes };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const redactionModes = [
    { value: 'mask', label: 'Mask (XXXX)', icon: EyeOff },
    { value: 'blur', label: 'Blur', icon: Zap },
    { value: 'replace', label: 'Replace', icon: Type }
  ];

  const piiCategories = [
    { key: 'names', label: 'Names' },
    { key: 'addresses', label: 'Addresses' },
    { key: 'phones', label: 'Phone Numbers' },
    { key: 'emails', label: 'Email Addresses' },
    { key: 'aadhaar', label: 'Aadhaar Numbers' },
    { key: 'pan', label: 'PAN Numbers' },
    { key: 'ssn', label: 'SSN' },
    { key: 'creditCards', label: 'Credit Cards' },
    { key: 'bankAccounts', label: 'Bank Accounts' },
    { key: 'qrCodes', label: 'QR Codes' },
    { key: 'barcodes', label: 'Barcodes' },
    { key: 'photos', label: 'Photos' },
    { key: 'signatures', label: 'Signatures' }
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-5 w-5 text-blue-700" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Redaction Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Redaction Mode */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Redaction Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {redactionModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.value}
                  onClick={() => handleSettingChange('redactionMode', mode.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                    settings.redactionMode === mode.value
                      ? 'border-blue-700 bg-blue-50 dark:bg-blue-900/20 text-blue-700'
                      : 'border-slate-200 dark:border-zinc-600 hover:border-blue-700 dark:hover:border-cyan-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PII Types */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            PII Types to Detect
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {piiCategories.map((category) => (
              <label key={category.key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.piiTypes[category.key]}
                  onChange={(e) => handlePiiTypeChange(category.key, e.target.checked)}
                  className="rounded border-slate-300 text-blue-700 focus:ring-blue-700 focus:ring-offset-0"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Languages
          </label>
          <div className="flex flex-wrap gap-2">
            {['english', 'hindi', 'kannada', 'telugu'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  const newLanguages = settings.languages.includes(lang)
                    ? settings.languages.filter(l => l !== lang)
                    : [...settings.languages, lang];
                  handleSettingChange('languages', newLanguages);
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  settings.languages.includes(lang)
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-600'
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Threshold */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
            Confidence Threshold: {Math.round(settings.confidenceThreshold * 100)}%
          </label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={settings.confidenceThreshold}
            onChange={(e) => handleSettingChange('confidenceThreshold', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedactionSettings;
