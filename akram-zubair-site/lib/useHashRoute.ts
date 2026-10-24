import { useEffect, useState } from 'react';

/**
 * Tiny hash router for the project detail view: "#/project/<id>".
 * Section anchors like "#projects" are left alone.
 */
export function useProjectRoute(): [string | null, (id: string | null) => void] {
  const read = () => {
    const m = window.location.hash.match(/^#\/project\/([\w-]+)/);
    return m ? m[1] : null;
  };
  const [id, setId] = useState<string | null>(read);

  useEffect(() => {
    const onChange = () => setId(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const go = (next: string | null) => {
    if (next) {
      window.location.hash = `/project/${next}`;
    } else if (read()) {
      // Return to the projects list without adding a history entry.
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#projects`);
      setId(null);
    }
  };
  return [id, go];
}
