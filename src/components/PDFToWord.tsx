import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const convert = async () => {
    if (!file) return;
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it: any) => it.str).join(' ') + '\n';
    }
    const doc = new Document({ sections: [{ properties: {}, children: text.split('\n').map(t => new Paragraph({ children: [new TextRun(t)] })) }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, file.name.replace(/\.pdf$/i, '.docx'));
  };
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0B192C', color: '#fff', gap: 16 }}>
      <h1>VG PDF to Word Converter</h1>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={convert} disabled={!file} style={{ padding: '8px 16px', borderRadius: 8 }}>Convert & Download</button>
    </div>
  );
}
