import packageJson from "../../package.json";

export function Footer() {
  const version = packageJson.version;
  const githubRepo = "alemoraru/email-signature-generator";

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>
            built by{" "}
            <a
              href="https://github.com/alemoraru"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              @alemoraru
            </a>
          </div>
          <div>
            <a
              href={`https://github.com/${githubRepo}/releases/tag/v${version}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              v{version}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
