import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import {toast} from 'sonner';
import { Button } from '@/components/ui/button';

const CertDownloader = ({user}) => {

  let toastId;
  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

    const generateQRCode = async (text) => {
      try {
        return await QRCode.toDataURL(text);
      } catch (error) {
        console.error('Error generating QR Code:', error);
      }
    };

  const generatePDF = async (name) => {
    try {
      const existingPdfBytes = await fetch('/certp.pdf').then((res) =>
        res.arrayBuffer()
      );
      // console.log(existingPdfBytes.length);

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);

      const fontBytes = await fetch('/ProductSans-Bold.ttf').then((res) =>
        res.arrayBuffer()
      );

      const ProductSansFont = await pdfDoc.embedFont(fontBytes);
      // console.log(ProductSansFont.length);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      // console.log(firstPage.length); 

      const verificationURL = `https://techfusion.org.in/verifycertificate/${user.festId}`;
      const qrCodeDataURL = await generateQRCode(verificationURL);

      const qrCodeImage = await pdfDoc.embedPng(qrCodeDataURL);

      const qrCodeWidth = 70;
      const qrCodeHeight = 70;
      // const qrCodeX = (firstPage.getWidth() - qrCodeWidth) / 2;
      // const qrCodeY = firstPage.getHeight() - qrCodeHeight - 20;
      
      const qrCodeX = 105;
      const qrCodeY = 122;

      firstPage.drawImage(qrCodeImage, {
        x: qrCodeX,
        y: qrCodeY,
        width: qrCodeWidth,
        height: qrCodeHeight,
      });
      
      // Add certificate ID below QR Code
      const certificateIdText = `${user.festId}`;
      const certificateIdTextWidth = ProductSansFont.widthOfTextAtSize(certificateIdText,10);
      const certificateIdTextX = qrCodeX - 5;
      const certificateIdTextY = qrCodeY - 10;

      firstPage.drawText(certificateIdText, {
        x: certificateIdTextX,
        y: certificateIdTextY,
        size: 10,
        font: ProductSansFont,
        // color: rgb(107 / 255, 105 / 255, 105 / 255),
        color: rgb(0, 0, 0),
      });

      const { width, height } = firstPage.getSize();
      const textWidth = ProductSansFont.widthOfTextAtSize(name, 26);

      const x = (width - textWidth) / 2;
      const y = (height - 26) / 2;

      firstPage.drawText(name, {
        x,
        y,
        size: 26,
        font: ProductSansFont,
        color: rgb(75/255, 75/255, 75/255),
        // color: rgb(107/255, 105/255, 105/255),

        // color: rgb(0, 0, 0),
        // 31, 31, 31
      });

      const pdfBytes = await pdfDoc.save();

      var file = new File([pdfBytes], 'TechFusionParticipationCertificate.pdf', {
        type: 'application/pdf;charset=utf-8',
      });

      saveAs(file);
     toast.dismiss(toastId);
    } catch (error) {
      console.error('Error generating Certificate:', error);
    }
  };

  const handleDownload = () => {
    const val = capitalize(user?.name?.trim());
    toastId = toast.loading('Generating Certificate...');

    if (val !== '' && user?.name) {
      generatePDF(user.gender==="Male"?"Mr. "+val:"Miss. "+val);
    } else {
      toast.error("Unable to generate certificate!");
    }
  };

  return (
    <div>
      <Button id="submitBtn" onClick={handleDownload} className="z-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl mb-2 mt-20 pt-2 pb-2 pr-4 pl-4 border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 border-white hover:border-none flex items-center">
        Download Certificate
      </Button>
    </div>
  );
};

export default CertDownloader;
