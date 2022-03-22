import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Zoom from '@mui/material/Zoom';
import { useState } from 'react';
import { Document, Page, pdfjs   } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={props.open} ref={ref} {...props} />;
});

function AssetDialog(props){

    const { open, handleClose, asset} = props;
    const [numPages, setNumPages] = useState(null);

    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
      };

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    return (
        <Dialog
            /* fullScreen */
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            sx={{maxHeight:'93%'}}
        >
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {asset.name.length < 20 ? asset.name : asset.name.substring(0, 20) + "..."}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="Example__container__document">
                {/* <Document
                    file={asset.content}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p> */}
                <Document file={asset.content} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>
        </Dialog>
    );
}

export default AssetDialog;