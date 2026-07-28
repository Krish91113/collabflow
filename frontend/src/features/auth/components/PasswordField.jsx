import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../../components/ui/Input.jsx';

export function PasswordField({ error, label = 'Password', registration, ...props }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label className="block">
      <span className="cf-label">{label}</span>
      <div className="relative mt-2">
        <Input className="pr-11" type={isVisible ? 'text' : 'password'} {...registration} {...props} />
        <button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-cf text-cf-muted hover:bg-cf-surfaceLow hover:text-cf-text focus-visible:cf-focus"
          onClick={() => setIsVisible((value) => !value)}
          type="button"
        >
          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error ? <span className="mt-1 block text-xs text-cf-danger">{error}</span> : null}
    </label>
  );
}
