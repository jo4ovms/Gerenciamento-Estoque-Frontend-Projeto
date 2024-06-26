import React from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';

const AboutUs = () => {
  return (
    <PageContainer title="Sobre Nós" description="Informações sobre a Stockify">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Sobre Nós">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5">Stockify</Typography>
                    <Typography variant="body1">
                      Stockify é um sistema de gerenciamento de estoque online desenvolvido para otimizar e automatizar a gestão de produtos e vendas em e-commerce. Nosso objetivo é proporcionar uma solução eficiente, moderna e segura, utilizando tecnologias de ponta como Spring Boot, React e MySQL.
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      Nosso projeto foi criado por uma equipe dedicada e talentosa composta por:
                    </Typography>
                    <ul>
                      <li>João Victor Maciel dos Santos</li>
                      <li>João Vitor Messias da Cruz Damasio</li>
                      <li>João Vitor Menegatt</li>
                    </ul>
                    <Typography variant="body1">
                      Este projeto faz parte do curso de Tecnólogo em Análise e Desenvolvimento de Sistemas no Instituto Federal Catarinense – Campus Fraiburgo. Sob a orientação do professor Paulo Costa, desenvolvemos uma plataforma robusta e intuitiva que facilita a vida dos gestores de e-commerce, fornecendo uma interface amigável e funcionalidades completas de controle de estoque.
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AboutUs;
