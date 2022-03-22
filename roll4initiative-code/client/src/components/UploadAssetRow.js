import {Typography, MenuItem, Input} from "@mui/material";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import API from '../API'

function UploadAssetRow(props) {

  const iconStyle = { marginRight: '10px' };
  const { id_game, assets, setAssets } = props;

  const handleUpload = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file => {
      if (!assets.find(asset => asset.name === file.name)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          let content = e.target.result;
          API.addManual(id_game, file.name, content);
          setAssets(prevAssets => [...prevAssets, {name: file.name, content: content}]);
        }
      }
    }))
  } 

  return (
    <>
      <label htmlFor="contained-button-file">
        <Input multiple accept="application/pdf" id="contained-button-file" inputProps={{ multiple: true }} type="file" sx={{ display: 'none' }} onChange={(e) => { handleUpload(e) }} />
        <MenuItem color="primary" sx={{ outline: "dashed 1.4px black", opacity: '0.4', borderRadius: '10px', marginTop: '4px', marginBottom: '8px', marginX: '10px', display: 'flex', justifyContent: 'left' }}>
          <PublishRoundedIcon sx={iconStyle}></PublishRoundedIcon>
          <Typography><b>Upload asset...</b></Typography>
        </MenuItem>
      </label>
    </>
  );
}

export default UploadAssetRow;