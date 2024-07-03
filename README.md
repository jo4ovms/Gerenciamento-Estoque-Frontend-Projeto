# Front-End Gerenciamento de Estoque

# Como usar:
Script de insercoes no banco do mysql

1. Rodar o backend
2. Rodar o front:
   - npm start

INSERT INTO `fornecedores` (`id`, `cnpj`, `email`, `nome`, `telefone`, `tipo_produto`) VALUES
(1, '04.907.991/0001-89', 'contato@samsung.com', 'Samsung Electronics', '(11) 4004-0000', 'Eletrônicos'),
(2, '61.858.241/0001-60', 'contato@nike.com', 'Nike', '(21) 3500-8000', 'Roupas'),
(3, '76.535.764/0001-43', 'contato@tokstok.com.br', 'Tok&Stok', '(31) 4003-6116', 'Móveis'),
(4, '53.113.791/0001-91', 'contato@nestle.com', 'Nestlé', '(41) 2141-8300', 'Alimentos'),
(5, '45.990.968/0001-52', 'contato@hasbro.com', 'Hasbro', '(51) 4003-6117', 'Brinquedos'),
(6, '62.173.841/0001-70', 'contato@culturalsb.com', 'Livraria Cultura', '(61) 3038-0000', 'Livros'),
(7, '51.936.941/0001-36', 'contato@tramontina.com', 'Tramontina', '(71) 3038-0000', 'Ferramentas'),
(8, '88.420.789/0001-52', 'contato@boticario.com.br', 'Boticário', '(81) 3038-0000', 'Cosméticos'),
(9, '66.969.244/0001-25', 'contato@dell.com', 'Dell', '(91) 3088-0000', 'Informática'),
(10, '04.204.241/0001-06', 'contato@penalty.com', 'Penalty', '(92) 4003-6118', 'Esportes');

INSERT INTO `produtos` (`id`, `fornecedor`, `nome`, `quantidade`, `valor`) VALUES
(1, 'Samsung Electronics', 'Smartphone Galaxy S21', 100, 4999.00),
(2, 'Nike', 'Tênis Air Max', 200, 599.00),
(3, 'Tok&Stok', 'Sofá de Canto', 50, 2999.00),
(4, 'Nestlé', 'KitKat', 300, 4.99),
(5, 'Hasbro', 'Boneca Baby Alive', 150, 159.00),
(6, 'Livraria Cultura', 'Livro O Hobbit', 400, 39.90),
(7, 'Tramontina', 'Jogo de Facas', 80, 249.00),
(8, 'Boticário', 'Perfume', 250, 189.90),
(9, 'Dell', 'Notebook Inspiron', 60, 3499.00),
(10, 'Penalty', 'Bola de Futebol', 100, 69.90);
