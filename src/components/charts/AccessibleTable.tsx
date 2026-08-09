'use client';

import React from 'react';

export interface AccessibleTableRow {
  [key: string]: string | number;
}

export interface AccessibleTableProps {
  /** Caption describing the chart data for screen readers */
  caption: string;
  /** Array of data rows to render as a table */
  data: AccessibleTableRow[];
  /** Column headers to display. If omitted, derived from data keys */
  headers?: string[];
  /** Additional class name */
  className?: string;
}

/**
 * AccessibleTable provides a visually hidden data table equivalent
 * for screen readers. This enables users of assistive technology to
 * access chart data in a tabular format.
 *
 * Uses sr-only pattern: positioned off-screen but available to screen readers.
 */
export function AccessibleTable({
  caption,
  data,
  headers,
  className,
}: AccessibleTableProps) {
  if (!data || data.length === 0) return null;

  const columnHeaders = headers ?? Object.keys(data[0]);

  return (
    <div
      className={`sr-only ${className ?? ''}`}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    >
      <table role="table" aria-label={caption}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnHeaders.map((header) => (
                <td key={`${rowIndex}-${header}`}>
                  {row[header] !== undefined ? String(row[header]) : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
