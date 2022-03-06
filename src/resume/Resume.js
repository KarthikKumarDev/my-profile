//@ts-check
import {
  Dialog,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import resumePDF from "./KarthikKumarJ.pdf";
import './Resume.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Resume = (props) => {
  const [file, setFile] = useState("../data/KarthikKumarJ.pdf");
  const [numPages, setNumPages] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <div className="">
      <Dialog open={props.isOpen} onClose={props.handleClose}>
        <DialogContent>
          <Document
            file={resumePDF}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{ workerSrc: "/pdf.worker.js" }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resume;
