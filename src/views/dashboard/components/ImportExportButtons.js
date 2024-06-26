import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';
import * as XLSX from 'xlsx';
import ProdutoService from '../../../services/produto.service';

const ImportExportButtons = ({ iconSize = 24, iconStyle = {}, containerStyle = {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleExport = () => {
    ProdutoService.exportProdutosToExcel()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'produtos.xlsx');
        document.body.appendChild(link);
        link.click();
        handleClose();
      })
      .catch(console.error);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      ProdutoService.importProdutosFromExcel(json)
        .then(() => console.log('Produtos importados com sucesso!'))
        .catch(console.error);
      handleClose();
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Box style={containerStyle}>
      <IconButton onClick={handleClick} style={iconStyle}>
        <Icon icon="mdi:microsoft-excel" width={iconSize} height={iconSize} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleExport}>Exportar Produtos</MenuItem>
        <MenuItem>
          <label htmlFor="raised-button-file" style={{ width: '100%' }}>
            <input
              accept=".xlsx"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImport}
            />
            <span>Importar Produtos</span>
          </label>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ImportExportButtons;
