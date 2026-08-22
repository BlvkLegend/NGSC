export function ThemeScript() {
  const code = `
    (function () {
      try {
        var mode = localStorage.getItem('gcc-mode');
        var legacy = localStorage.getItem('gcc-theme');
        var isDark = mode === 'cruise' || (!mode && legacy === 'dark');
        if (isDark) document.documentElement.classList.add('dark');
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
