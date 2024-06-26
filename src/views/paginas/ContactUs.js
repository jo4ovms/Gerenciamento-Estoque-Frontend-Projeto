import React from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';

const ContactUs = () => {
  return (
    <PageContainer title="Contato" description="Como nos contactar">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Contato">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5">Contato</Typography>
                    <Typography variant="body1">
                      Stockify está à disposição para esclarecer dúvidas, receber sugestões ou
                      discutir parcerias. Entre em contato conosco:
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      <strong>Email:</strong> contato@stockify.com
                    </Typography>
                    <Typography variant="body1">
                      <strong>Telefone:</strong> (49) 9999-9999
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      Você também pode nos seguir nas redes sociais para ficar por dentro das
                      novidades e atualizações do nosso sistema:
                    </Typography>
                    <Typography variant="body1">
                      <strong>Facebook:</strong> facebook.com/stockify
                    </Typography>
                    <Typography variant="body1">
                      <strong>Instagram:</strong> instagram.com/stockify
                    </Typography>
                    <Typography variant="body1">
                      <strong>LinkedIn:</strong> linkedin.com/company/stockify
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      Estamos ansiosos para ajudar a melhorar a gestão do seu estoque e otimizar
                      suas operações de e-commerce com a eficiência e a inovação que só a Stockify
                      pode oferecer.
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

export default ContactUs;
