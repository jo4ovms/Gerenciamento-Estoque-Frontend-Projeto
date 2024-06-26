import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';
import FornecedorService from '../../../services/fornecedor.service';

const ImportExportButtonsFornecedor = ({ iconSize = 24, iconStyle = {}, containerStyle = {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleExport = () => {
    FornecedorService.exportFornecedoresToExcel()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'fornecedores.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(console.error);
    handleClose();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      FornecedorService.importFornecedoresFromExcel(file)
        .then(() => console.log('Fornecedores importados com sucesso!'))
        .catch(console.error);
    };

    reader.readAsArrayBuffer(file);
    handleClose();
  };

  return (
    <Box style={containerStyle}>
      <IconButton onClick={handleClick} style={iconStyle}>
        <Icon icon="mdi:microsoft-excel" width={iconSize} height={iconSize} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleExport}>Exportar Fornecedores</MenuItem>
        <MenuItem>
          <input
            accept=".xlsx"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImport}
          />
          <label htmlFor="raised-button-file">Importar Fornecedores</label>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ImportExportButtonsFornecedor;
