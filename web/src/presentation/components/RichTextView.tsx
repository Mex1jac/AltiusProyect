import { Fragment } from 'react';
import type { RichText } from '../../domain/entities/site';

/** Renders plain text or inline parts (bold segments and links). */
export function RichTextView({ value }: { value: RichText }) {
  if (typeof value === 'string') {
    return <>{value}</>;
  }

  return (
    <>
      {value.map((part, index) => {
        if (typeof part === 'string') {
          return <Fragment key={index}>{part}</Fragment>;
        }
        if ('strong' in part) {
          return <strong key={index}>{part.strong}</strong>;
        }
        return (
          <a key={index} href={part.href}>
            {part.text}
          </a>
        );
      })}
    </>
  );
}
