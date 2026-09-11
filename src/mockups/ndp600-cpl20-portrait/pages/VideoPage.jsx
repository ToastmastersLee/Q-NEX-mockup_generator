import { useState } from 'react';
import { GlassPanel, SoftRow, IconButton } from '../components/common';
import { inputOptions, readQuery } from '../constants/nav';
import './VideoPage.css';


export function VideoPage() {
  const [duplicate, setDuplicate] = useState(readQuery('duplicate') === '1');
  const [singleInput, setSingleInput] = useState('hdmi1');
  const [outputs, setOutputs] = useState({ a: 'hdmi1', b: 'hdmi2', c: 'hdmi1' });

  return (
    <div className="ndp-page">
      <GlassPanel>
        <div className="ndp-card-heading ndp-duplicate-header">
          <label className="ndp-duplicate-label" onClick={() => setDuplicate(!duplicate)}>
            <div className={`ndp-checkbox ${duplicate ? 'is-checked' : ''}`}>
              {duplicate && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span>Duplicate Mode</span>
          </label>
          <div className="ndp-help-icon">
            <span>?</span>
          </div>
        </div>
        {duplicate ? (
          <div className="ndp-input-grid">
            {inputOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button key={option.id} className={`ndp-large-source ${singleInput === option.id ? 'is-active' : ''}`} type="button" onClick={() => setSingleInput(option.id)}>
                  <Icon />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="ndp-output-list">
            {['a', 'b', 'c'].map((output) => (
              <SoftRow key={output} label={`HDMI out ${output.toUpperCase()}`}>
                {inputOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <IconButton key={option.id} active={outputs[output] === option.id} label={option.label} onClick={() => setOutputs((current) => ({ ...current, [output]: option.id }))}>
                      <Icon />
                    </IconButton>
                  );
                })}
              </SoftRow>
            ))}
          </div>
        )}
      </GlassPanel>
    </div>
  );
}
