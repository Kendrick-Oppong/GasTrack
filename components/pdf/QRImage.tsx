"use client";

import { useEffect, useState } from "react";
import { Image } from "@react-pdf/renderer";

const QRImage = ({ bookingId }: { bookingId: string }) => {
  const [qrCodeDataUri, setQrCodeDataUri] = useState("");

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const qrCodeDataUri = canvas.toDataURL("image/jpg", 0.3);
      setQrCodeDataUri(qrCodeDataUri);
    }
  }, [bookingId]);

  return (
    <Image
      src={qrCodeDataUri}
      style={{ width: 150, height: 150, marginBottom: 5 }}
    />
  );
};

export default QRImage;
