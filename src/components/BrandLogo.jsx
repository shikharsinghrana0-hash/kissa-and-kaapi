import React from 'react';

/**
 * Minimalist architectural & botanical crest for Kissa & Kaapi.
 */
export function BrandLogo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* Arched courtyard frame */}
      <path
        d="M7 34V18C7 10.82 12.82 5 20 5C27.18 5 33 10.82 33 18V34"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M4.5 34H35.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      {/* Ceramic cup silhouette */}
      <path
        d="M13.5 21H26.5L25.2 28.5C24.9 30.2 23.5 31.2 21.8 31.2H18.2C16.5 31.2 15.1 30.2 14.8 28.5L13.5 21Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      {/* Delicate steam / botanical curve */}
      <path
        d="M17.5 17.5C17.5 15.6 19.2 15.2 19.2 13.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M22.2 17.5C22.2 15.6 20.5 15.2 20.5 13.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Warm terracotta sun dot */}
      <circle cx="20" cy="9.8" r="1.45" fill="var(--accent)" />
    </svg>
  );
}
