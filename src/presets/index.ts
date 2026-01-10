/**
 * Preset System
 * Centralized preset configuration and management
 */

import { PresetConfig, ProjectConfig } from '../types';
import { saasPreset } from './saas';
import { ecommercePreset } from './ecommerce';
import { blogPreset } from './blog';
import { devtoolPreset } from './devtool';
import { portfolioPreset } from './portfolio';
import { minimalPreset } from './minimal';

// Export all presets
export * from './saas';
export * from './ecommerce';
export * from './blog';
export * from './devtool';
export * from './portfolio';
export * from './minimal';

// Preset registry
export const presets: Record<string, PresetConfig> = {
  saas: saasPreset,
  ecommerce: ecommercePreset,
  blog: blogPreset,
  devtool: devtoolPreset,
  portfolio: portfolioPreset,
  minimal: minimalPreset
};

// Utility functions
export function getPreset(name: string): PresetConfig | null {
  return presets[name] || null;
}

export function getPresetNames(): string[] {
  return Object.keys(presets);
}

export function getPresetsByCategory(category: 'starter' | 'specialized' | 'minimal'): PresetConfig[] {
  return Object.values(presets).filter(preset => preset.category === category);
}

export function validatePresetName(name: string): boolean {
  return name in presets;
}

export function applyPresetToConfig(config: Partial<ProjectConfig>, presetName: string): Partial<ProjectConfig> {
  const preset = getPreset(presetName);
  if (!preset) {
    throw new Error(`Invalid preset: ${presetName}`);
  }

  // Apply preset configuration, but preserve existing config values
  const { name, description, category, ...presetConfig } = preset;

  return {
    ...presetConfig,
    ...config, // User config takes priority
    preset: presetName
  };
}

export function getPresetDescription(name: string): string {
  const preset = getPreset(name);
  return preset ? preset.description : `Unknown preset: ${name}`;
}

export function listPresets(): Array<{name: string, description: string, category: string}> {
  return Object.values(presets).map(preset => ({
    name: preset.name,
    description: preset.description,
    category: preset.category
  }));
}