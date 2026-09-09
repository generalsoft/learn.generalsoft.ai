import { useState } from 'react';

interface FacultyAvatarProps {
  name: string;
  photo?: string;
  /** Applied to the inner element; size the wrapping container to control dimensions. */
  className?: string;
  /** Tailwind font-size class for the initials fallback, e.g. "text-xl". */
  initialsClassName?: string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/**
 * Renders a faculty portrait with a graceful initials fallback when no photo
 * is provided or when the image fails to load.
 */
export default function FacultyAvatar({
  name,
  photo,
  className = '',
  initialsClassName = 'text-2xl',
}: FacultyAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt={`Portrait of ${name}`}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={`flex items-center justify-center bg-gradient-to-tr from-primary-600 to-indigo-600 text-white font-bold ${initialsClassName} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
