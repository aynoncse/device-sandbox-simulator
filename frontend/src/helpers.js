import { Fan, Lightbulb } from 'lucide-react';

export function hexToRgba(hex, alpha = '100%') {
  hex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    console.error('Invalid hex color format. Expected 3 or 6 characters.');
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getIconByType(type) {
  if (type === 'fan') return Fan;
  if (type === 'light') return Lightbulb;
}

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID)
    return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2, 10);
}
