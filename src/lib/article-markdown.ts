export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function renderMarkdown(raw: string): string {
  const linkClass = 'text-emerald-600 underline hover:text-emerald-700 transition-colors';
  let text = raw
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

  text = text.replace(/\r\n?/g, '\n');

  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    if (typeof url === 'string' && url.startsWith('#')) {
      return `<a href="${url}" class="${linkClass}">${label}</a>`;
    }

    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${label}</a>`;
  });

  text = text.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 text-slate-800">$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/^---$/gm, '<hr class="my-10 border-white/20" />');

  const lines = text.split('\n');
  const html: string[] = [];
  let inUL = false;
  let inOL = false;
  let inBlockquote = false;

  const closeLists = () => {
    if (inUL) {
      html.push('</ul>');
      inUL = false;
    }
    if (inOL) {
      html.push('</ol>');
      inOL = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      html.push('</blockquote>');
      inBlockquote = false;
    }
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeLists();
      closeBlockquote();
      const level = Math.min(6, headingMatch[1].length);
      const content = headingMatch[2].trim();
      const id = slugify(content);
      html.push(`<h${level} id="${id}" class="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12 first:mt-0">${content}</h${level}>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeLists();
      if (!inBlockquote) {
        html.push('<blockquote class="border-l-4 border-emerald-200 pl-4 italic text-slate-700 bg-emerald-50/70 py-2 pr-4 rounded-r-lg my-6">');
        inBlockquote = true;
      }
      html.push(line.replace(/^>\s?/, ''));
      continue;
    }

    closeBlockquote();

    if (/^\s*-\s+/.test(line)) {
      if (!inUL) {
        closeLists();
        html.push('<ul class="list-disc pl-6 my-4 space-y-2">');
        inUL = true;
      }
      html.push(`<li>${line.replace(/^\s*-\s+/, '')}</li>`);
      continue;
    }

    if (/^\s*\d+\)\s+/.test(line)) {
      if (!inOL) {
        closeLists();
        html.push('<ol class="list-decimal pl-6 my-4 space-y-2">');
        inOL = true;
      }
      html.push(`<li>${line.replace(/^\s*\d+\)\s+/, '')}</li>`);
      continue;
    }

    if (/^\s*$/.test(line)) {
      closeLists();
      html.push('');
      continue;
    }

    closeLists();
    html.push(`<p class="text-slate-700 text-lg leading-relaxed mb-6">${line}</p>`);
  }

  closeLists();
  closeBlockquote();

  return html.join('\n');
}

export function extractToc(raw: string): { level: number; text: string; id: string }[] {
  const text = raw.replace(/\\n/g, '\n').replace(/\r\n?/g, '\n');

  return text
    .split('\n')
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2].trim()),
    }));
}
