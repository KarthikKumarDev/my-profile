//@ts-check
import { Button, Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";

import resumePDF from "./KarthikKumarJ.pdf";
import "./Resume.scss";

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

  const handleResumeDownload = (event) => {
    var link = document.createElement("a");
    link.setAttribute("download", "Karthik Kumar J.pdf");
    link.href = resumePDF;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleOpenNewTab = (event) => {
    var link = document.createElement("a");
    link.href = resumePDF;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="resume">
      <Dialog open={props.isOpen} onClose={props.handleClose}>
        <DialogContent>
          <div className="options-wrapper">
            <div className="resume-options">
              <DownloadForOfflineIcon
                color="action"
                onClick={handleResumeDownload}
              />
              <OpenInNewIcon color="secondary" onClick={handleOpenNewTab} />
              <GitHubIcon
                color="primary"
                onClick={(event) =>
                  window
                    .open("https://github.com/KarthikKumarDev", "_blank")
                    .focus()
                }
              />
              <CancelIcon color="error" onClick={props.handleClose} />
            </div>
          </div>

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
