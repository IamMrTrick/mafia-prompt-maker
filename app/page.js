'use client';

import { useState } from 'react';
import { generatePrompt, OPTIONS } from './promptGenerator';
import './globals.css';

export default function Home() {
  const [promptData, setPromptData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [promptFormat, setPromptFormat] = useState('text');

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedExpression, setSelectedExpression] = useState('');
  const [selectedClothing, setSelectedClothing] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState('');
  const [selectedHair, setSelectedHair] = useState('');
  const [selectedMakeup, setSelectedMakeup] = useState('');

  const [randomGender, setRandomGender] = useState(true);
  const [randomNationality, setRandomNationality] = useState(true);
  const [randomStyle, setRandomStyle] = useState(true);
  const [randomExpression, setRandomExpression] = useState(true);
  const [randomClothing, setRandomClothing] = useState(true);
  const [randomAccessory, setRandomAccessory] = useState(true);
  const [randomHair, setRandomHair] = useState(true);
  const [randomMakeup, setRandomMakeup] = useState(true);

  const handleGenerate = () => {
    const options = {};
    if (!randomGender && selectedGender) options.gender = selectedGender;
    if (!randomNationality && selectedNationality) options.nationality = selectedNationality;
    if (!randomStyle && selectedStyle) options.styleVariant = selectedStyle;
    if (!randomExpression && selectedExpression) options.expressionVariant = selectedExpression;
    if (!randomClothing && selectedClothing) options.clothing = selectedClothing;
    if (!randomAccessory && selectedAccessory) options.accessory = selectedAccessory;
    if (!randomHair && selectedHair) options.hair = selectedHair;
    if (!randomMakeup && selectedMakeup) options.makeup = selectedMakeup;

    const data = generatePrompt(options);
    setPromptData(data);
    setCopied(false);

    const promptToCopy = promptFormat === 'json'
      ? JSON.stringify(data.jsonPrompt, null, 2)
      : data.textPrompt;
    navigator.clipboard.writeText(promptToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCurrentPrompt = () => {
    if (!promptData) return '';
    return promptFormat === 'json'
      ? JSON.stringify(promptData.jsonPrompt, null, 2)
      : promptData.textPrompt;
  };

  const getPromptLength = () => {
    return getCurrentPrompt().length;
  };

  const handleCopy = () => {
    if (promptData) {
      navigator.clipboard.writeText(getCurrentPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getClothingOptions = () => {
    return selectedGender === 'female' ? OPTIONS.FEMALE_CLOTHING : OPTIONS.MALE_CLOTHING;
  };

  const getAccessoryOptions = () => {
    return selectedGender === 'female' ? OPTIONS.FEMALE_ACCESSORIES : OPTIONS.MALE_ACCESSORIES;
  };

  const getHairOptions = () => {
    return selectedGender === 'female' ? OPTIONS.FEMALE_HAIR : OPTIONS.MALE_HAIR;
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🎬 Mafia Prompt Generator</h1>
          <p className="subtitle">
            Generate consistent, photo-realistic 3D mafia character prompts for AI image generation
          </p>
        </header>

        <div className="parameters-section">
          <h2>Character Parameters</h2>
          <p className="parameters-description">Toggle "Random" for any parameter, or select a specific value</p>

          <div className="parameters-grid">
            <div className="parameter-item">
              <div className="parameter-header">
                <label>Gender</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomGender}
                    onChange={(e) => setRandomGender(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                disabled={randomGender}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {OPTIONS.GENDERS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="parameter-item">
              <div className="parameter-header">
                <label>Nationality</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomNationality}
                    onChange={(e) => setRandomNationality(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                disabled={randomNationality}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {OPTIONS.NATIONALITIES.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="parameter-item">
              <div className="parameter-header">
                <label>Style</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomStyle}
                    onChange={(e) => setRandomStyle(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                disabled={randomStyle}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {OPTIONS.STYLE_VARIANTS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="parameter-item">
              <div className="parameter-header">
                <label>Expression</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomExpression}
                    onChange={(e) => setRandomExpression(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedExpression}
                onChange={(e) => setSelectedExpression(e.target.value)}
                disabled={randomExpression}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {OPTIONS.EXPRESSION_VARIANTS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="parameter-item">
              <div className="parameter-header">
                <label>Clothing</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomClothing}
                    onChange={(e) => setRandomClothing(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedClothing}
                onChange={(e) => setSelectedClothing(e.target.value)}
                disabled={randomClothing}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {getClothingOptions().map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="parameter-item">
              <div className="parameter-header">
                <label>Accessory</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomAccessory}
                    onChange={(e) => setRandomAccessory(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedAccessory}
                onChange={(e) => setSelectedAccessory(e.target.value)}
                disabled={randomAccessory}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {getAccessoryOptions().map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="parameter-item">
              <div className="parameter-header">
                <label>Hair</label>
                <label className="random-toggle">
                  <input
                    type="checkbox"
                    checked={randomHair}
                    onChange={(e) => setRandomHair(e.target.checked)}
                  />
                  <span>Random</span>
                </label>
              </div>
              <select
                value={selectedHair}
                onChange={(e) => setSelectedHair(e.target.value)}
                disabled={randomHair}
                className="parameter-select"
              >
                <option value="">Select...</option>
                {getHairOptions().map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {selectedGender === 'female' && (
              <div className="parameter-item">
                <div className="parameter-header">
                  <label>Makeup</label>
                  <label className="random-toggle">
                    <input
                      type="checkbox"
                      checked={randomMakeup}
                      onChange={(e) => setRandomMakeup(e.target.checked)}
                    />
                    <span>Random</span>
                  </label>
                </div>
                <select
                  value={selectedMakeup}
                  onChange={(e) => setSelectedMakeup(e.target.value)}
                  disabled={randomMakeup}
                  className="parameter-select"
                >
                  <option value="">Select...</option>
                  {OPTIONS.FEMALE_MAKEUP.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="controls">
          <button className="generate-btn" onClick={handleGenerate}>
            Generate New Prompt
          </button>
        </div>

        {promptData && (
          <div className="results">
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{promptData.details.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nationality:</span>
                <span className="detail-value">{promptData.details.nationality}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Style:</span>
                <span className="detail-value">{promptData.details.styleVariant}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Expression:</span>
                <span className="detail-value">{promptData.details.expressionVariant}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Clothing:</span>
                <span className="detail-value">{promptData.details.clothing}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Accessory:</span>
                <span className="detail-value">{promptData.details.accessory}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Hair:</span>
                <span className="detail-value">{promptData.details.hair}</span>
              </div>
              {promptData.details.makeup && (
                <div className="detail-item">
                  <span className="detail-label">Makeup:</span>
                  <span className="detail-value">{promptData.details.makeup}</span>
                </div>
              )}
            </div>

            <div className="prompt-container">
              <div className="prompt-header">
                <h3>Generated Prompt</h3>
                <div className="prompt-controls">
                  <div className="format-selector">
                    <button
                      className={`format-btn ${promptFormat === 'text' ? 'active' : ''}`}
                      onClick={() => setPromptFormat('text')}
                    >
                      Text
                    </button>
                    <button
                      className={`format-btn ${promptFormat === 'json' ? 'active' : ''}`}
                      onClick={() => setPromptFormat('json')}
                    >
                      JSON
                    </button>
                  </div>
                  <button
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="prompt-length">
                <span className={getPromptLength() > 2500 ? 'length-warning' : 'length-ok'}>
                  {getPromptLength()} / 2500 characters
                  {getPromptLength() > 2500 && ' ⚠️ Exceeds limit!'}
                </span>
              </div>
              <div className="prompt-text">
                {getCurrentPrompt()}
              </div>
            </div>
          </div>
        )}

        {!promptData && (
          <div className="empty-state">
            <p>Configure your parameters above and click "Generate New Prompt"</p>
          </div>
        )}
      </div>
    </div>
  );
}
