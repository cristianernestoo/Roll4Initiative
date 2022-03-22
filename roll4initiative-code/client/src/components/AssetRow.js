import {Typography, MenuItem, IconButton, Dialog, DialogActions, DialogTitle, Button, Zoom} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../API'
import { useState } from "react";

function AssetRow(props) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const {id_game, asset, setAsset, assets, setAssets, setAssetShow} = props;

  const handleClickOpen = (a) => {        
    setAsset(a);
    setAssetShow(true);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
};
const handleDialogClose = () => {
    setDialogOpen(false);
};

  const handleDelete = (id_game, asset_name) => {
    API.deleteAsset(id_game, asset_name).then(
      setAssets(assets.filter(a => a.name !== asset_name))
    );
    document.getElementById('contained-button-file').value = ""
  };

  let icon ="";

  const iconStyle = {marginRight:'10px', opacity:'0.3', marginLeft:'-5px'};

  if (asset.name.includes(".pdf")) {
    icon = <ArticleIcon sx={iconStyle} onClick={() => handleClickOpen(asset)}></ArticleIcon>
  } else if (asset.name.includes(".jpg") || asset.name.includes(".jpeg") || asset.name.includes(".png")) {
    icon = <ArticleIcon sx={iconStyle} onClick={() => handleClickOpen(asset)}></ArticleIcon>
  }

  return (
    <>
      <MenuItem sx={{ borderRadius: '10px', marginX: '10px', display: 'flex', justifyContent: 'space-between' }} >
        {icon}
        <Typography onClick={()=>handleClickOpen(asset)}>{asset.name.length < 15 ? asset.name : asset.name.substring(0, 15) + "..."}
        </Typography>
        <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </MenuItem>

      <Dialog
        sx={{bottom:"56px"}}
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Zoom}
    >
        <MenuItem sx={{mt:'1rem', textAlign:'left', borderRadius: '10px', marginX: '10px', display: 'flex'}} >
          {icon}
          <Typography >{asset.name.length < 25 ? asset.name : asset.name.substring(0, 25) + "..."}
          </Typography>
        </MenuItem>
      <DialogTitle id="alert-dialog-title">
        {"Do you really want to delete this asset?"}
        </DialogTitle>
        <DialogActions>
        <Button onClick={handleDialogClose}>No</Button>
        <Button onClick={() => handleDelete(id_game, asset.name)}>Yes</Button>
        </DialogActions>
    </Dialog>

    </>
    
  );
}

export default AssetRow;