export default function MetadataHeader() {
  return (
    <header className="metadata-grid">
      <div className="meta-col">
        <span className="meta-label">VERSION</span>
        <span className="mono text-sm-eclipse weight-bold">v2.4.0-STABLE // ECLIPSE</span>
        <span className="text-md-eclipse weight-bold">
          ECLIPSE<br />COMMAND LINE
        </span>
      </div>
      <div className="meta-col">
        <span className="meta-label">BUILD</span>
        <span className="text-sm-eclipse">ID: 0x8F2A9C</span>
        <span className="text-sm-eclipse">NODE: KERNEL-01</span>
      </div>
      <div className="meta-col">
        <span className="meta-label">RUNTIME</span>
        <span className="mono text-sm-eclipse">UPTIME: 342:12:08</span>
        <span className="mono text-sm-eclipse">THREAD: ASYNC_IO</span>
      </div>
      <div className="meta-col right">
        <span className="meta-label">PLATFORM</span>
        <span className="mono text-sm-eclipse">OS: UNIX_X86_64</span>
        <span className="mono text-sm-eclipse">SHELL: ZSH/BASH</span>
      </div>
    </header>
  );
}
