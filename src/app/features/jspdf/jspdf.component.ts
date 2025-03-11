import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import jsPDF from 'jspdf';

const PDF_PROPS = {
  TitleFontSize: 20,
  LineHeight: 1.5,
  PADDING: 0.5,
  // 英寸换算到 point
  PtsPerInch: 72,
  BodyFontSize: 14,
}

const previewText = '{"s3Input":"s3://mig-np04-dv-uswest2-dna/QA/transcription-service/input/2025021415143661201530277240056801.wav","requestId":"773275de-2707-43d9-9d2b-5239a5658bb5","businessId":"MP-Admin","processType":"Async","sourceSystem":"Sara-DEV","externalId":"2025021415143661201530277240056801","anonymize":"true","s3Output":"s3://mig-np04-dv-uswest2-dna/QA/transcription-service/MP-Admin/Output/2025021415143661201530277240056801.json","language":"en","transcription":[{"start":"00:00:02","end":"00:00:05","speaker":"Q","message":" This is mock data?"}]}'

const question = {
  "start": "00:00:02",
  "end": "00:00:05",
  "speaker": "Q",
  "message": " This is mock data?"
}

@Component({
  selector: 'app-jspdf',
  imports: [ThemeModule],
  templateUrl: './jspdf.component.html',
  styleUrl: './jspdf.component.css'
})
export class JspdfComponent {
  @ViewChild('exportRef') exportRef!: ElementRef;
  downloadPDF = () => {
    const doc = new jsPDF({
      unit: 'in',
    });
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let x = PDF_PROPS.PADDING, y = PDF_PROPS.PADDING;

    doc
      .setLineHeightFactor(PDF_PROPS.LineHeight)
      .setFont('Courier', 'bold')
      .setFontSize(PDF_PROPS.TitleFontSize)
      .setTextColor('#d01515')
      .text('Demo', x, y);

    doc
      .setDrawColor('#440f0f')
      .setLineWidth(0.5 / PDF_PROPS.PtsPerInch)
      .line(x, y + 0.1, pageWidth - PDF_PROPS.PADDING, y + 0.1);

    y += PDF_PROPS.TitleFontSize * PDF_PROPS.LineHeight / PDF_PROPS.PtsPerInch;

    const result = [
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
      question,
    ].map((t: any) => `(${t.start}) ${t.speaker}: ${t.message}`)
      .join('\n\n');

    const textLines = doc.splitTextToSize(result, pageWidth - (2 * PDF_PROPS.PADDING));
    console.log(textLines, result);
    doc
      .setFont('Courier', 'bold')
      .setTextColor('#210707')
      .setFontSize(PDF_PROPS.BodyFontSize);

    textLines.forEach((item: any) => {
      if (y > pageHeight - PDF_PROPS.PADDING) {
        doc.addPage();
        y = PDF_PROPS.PADDING;
      }
      doc.text(item, x, y);
      y += PDF_PROPS.BodyFontSize * PDF_PROPS.LineHeight / PDF_PROPS.PtsPerInch;
    });

    doc.output('dataurlnewwindow', { filename: 'test' });
  }

  downloadPDFFromElement = () => {
    const doc = new jsPDF({
      orientation: 'p',  // 纵向（portrait）
      unit: 'mm',        // 以毫米为单位
      format: 'a4',      // 设置 PDF 格式为 A4 (210mm x 297mm)
    });

    // 获取 HTML 元素
    const element = this.exportRef.nativeElement;

    // 使 HTML 内容适应 A4 页面宽度和高度
    doc.html(element, {
      callback: function (doc) {
        doc.save('document.pdf');  // 保存 PDF 文件
      },
      margin: [15, 15],  // 页面边距：上、右、下、左
      width: 180,        // 限制宽度，避免内容超出 A4 页面宽度
      windowWidth: element.scrollWidth, // 适应 HTML 宽度
    });
  }

  static safeParser = (str: string) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return {}
    }
  }
}
